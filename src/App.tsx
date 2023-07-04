import { useState, useEffect, useRef } from 'react'
import { db } from "./firebase-config"
import { collection, getDocs, addDoc } from "firebase/firestore";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Route, Routes } from "react-router-dom"
import jobsArray from './jobsArray';
import { messageRef, isValidComment } from './util/FirebaseFunctions';
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

  const menuRef = useRef<any>()
  const mobileBtnRef = useRef<any>()

  const handleCommentSubmit = () => {
    isValidComment()? createComment() : rejectComment()
  }

  const handleJobClick = (index:number) => {
    setJobIndex(index)
  }

  const handleJobChange = {
    prev: () => {setJobIndex((prev) => prev > 0 ? prev-1 : jobsArray.length-1)},
    next: () => {setJobIndex((prev) => prev < jobsArray.length-1 ? prev+1 : 0)},
  }

  const commentArray:string[] = ["Comment1", "Comment2", "Comment3"]

  // Firebase functionality
  const [firebaseItemsDB, setFirebaseItemsDB] = useState([])
  const commentsCollectionRef = collection(db, "commentsCollection")

  // Create comments
  const createComment = async () => {
    await addDoc(commentsCollectionRef, {commentMessage: messageRef.current.value.trim(), name: "Anonymous"+Math.ceil(Math.random()*100), date: new Date()})
    messageRef.current.value = ""
    getComments()
    setModalMessage("Comment Posted")
    setIsModalShowing(true)
  }

  const rejectComment = () => {
    setModalMessage("Comment must be between 4-250 characters")
    setIsModalShowing(true)
  }

  // needs interface or type for the array of comments that are coming in from firebase
  // // Read all comments
  const getComments = async () => {
    const data = await getDocs(commentsCollectionRef);
    let firebaseArray:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setFirebaseItemsDB(firebaseArray);
    console.log(firebaseArray)
    console.log(firebaseItemsDB)
  }

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

        <CommentComponent commentArray={commentArray} handleCommentSubmit={handleCommentSubmit} messageRef={messageRef} />

      </div>

      <FooterComponent />
    </>
  )
}

export default App
