import { useState, useEffect, useRef } from 'react'
import { addDoc, getDocs } from "firebase/firestore";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Route, Routes, useLocation } from "react-router-dom"
import jobsArray from './jobsArray';
import { isValidComment, commentsCollectionRef } from './util/FirebaseFunctions';
import AboutComponent from "./components/AboutComponent"
import CommentComponent from './components/CommentComponent'
import HeaderComponent from './components/HeaderComponent';
import JobComponent from './components/JobComponent';
import ForumComponent from './components/ForumComponent';
import ModalComponent from './components/ModalComponent';
import FooterComponent from './components/FooterComponent';

function App() {

  const [jobIndex, setJobIndex] = useState<number>(0)
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>("Modal Alert Active")
  const [showMobileUL, setShowMobileUL] = useState<boolean>(false)

  const [firebaseItemsDB, setFirebaseItemsDB] = useState<any>([{commentMessage:"1", id:1, name:"test", date: {seconds: 999}}])
  const messageRef = useRef<any>()

  let isSortedByRecent = true

  const menuRef = useRef<any>()
  const mobileBtnRef = useRef<any>()

  const handleCommentSubmit = () => {
    isValidComment(messageRef)? createComment() : rejectComment()
  }

  const handleJobClick = (index:number) => {
    setJobIndex(index)
  }

  const handleJobChange = {
    prev: () => {setJobIndex((prev) => prev > 0 ? prev-1 : jobsArray.length-1)},
    next: () => {setJobIndex((prev) => prev < jobsArray.length-1 ? prev+1 : 0)},
  }

  const createComment = async () => {
    await addDoc(commentsCollectionRef, {commentMessage: messageRef.current.value.trim(), name: "Anonymous"+Math.ceil(Math.random()*1000), date: new Date()})
    messageRef.current.value = ""
    getComments()
    setModalMessage("Comment Posted")
    setIsModalShowing(true)
  }

  const rejectComment = () => {
    setModalMessage("Comment must be between 4-250 characters long.")
    setIsModalShowing(true)
  }

  // needs interface or type for the array of comments that are coming in from firebase
  const getComments = async () => {
    try {
      const data = await getDocs(commentsCollectionRef);
      let comments = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      isSortedByRecent ? comments.sort((a:any, b:any) => b.date.seconds - a.date.seconds) : comments.sort((a:any, b:any) => a.date.seconds - b.date.seconds)
      setFirebaseItemsDB(comments)
    }
    catch (err) {
      console.log("Something went wrong.")
      console.log(err)
    }
  }

  // Below are UseEffects 
  useEffect(() => {
    getComments()
  }, [])

  useEffect(() => {
    let handler = (e:any)=>{
      if(!menuRef.current?.contains(e.target) && !mobileBtnRef.current?.contains(e.target)){
        setShowMobileUL(false);
      }      
    }
    document.addEventListener("click", handler);
    
    return() =>{
      document.removeEventListener("click", handler);
    }
  }, []);
  
  useEffect(() => {
    let handler = (e:any)=>{
      if (e.code === "ArrowLeft") {
        handleJobChange.prev()
      }
      if (e.code === "ArrowRight") {
        handleJobChange.next()
      }
    }
    document.addEventListener("keydown", handler);
    
    return() =>{
      document.removeEventListener("keydown", handler);
    }
  }, []);

  const location = useLocation()  
  useEffect(() => {
    window.scrollTo(0,0)
}, [location.pathname])

  return (
    <>
      { isModalShowing && <ModalComponent modalMessage={modalMessage} setIsModalShowing={setIsModalShowing} /> }

      <div className='max-w-7xl m-auto'>
        <HeaderComponent handleJobClick={handleJobClick} jobsArray={jobsArray} menuRef={menuRef} mobileBtnRef={mobileBtnRef} showMobileUL={showMobileUL} setShowMobileUL={setShowMobileUL} />

        <Routes>
          <Route path='/' element={ <JobComponent job={jobsArray[jobIndex]} handleJobChange={handleJobChange} jobIndex={jobIndex} jobsArray={jobsArray} /> } />
          <Route path='/about' element={ <AboutComponent /> } />
          <Route path='/forum' element={ <ForumComponent /> } />
        </Routes>

        <CommentComponent firebaseItemsDB={firebaseItemsDB} handleCommentSubmit={handleCommentSubmit} messageRef={messageRef} />

      </div>

      <FooterComponent />
    </>
  )
}

export default App
