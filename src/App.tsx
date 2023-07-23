import { useState, useEffect, useRef,  } from 'react'
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
  const [isSortedByRecent, setIsSortedByRecent] = useState<boolean>(true)

  type comment = {
    commentMessage: string, 
    id: string,
    name: string, 
    date: Date
  }[]

  const [firebaseItemsDB, setFirebaseItemsDB] = useState<comment>([{commentMessage:"1", id: "4abcd", name:"test", date: new Date()}])
  const messageRef = useRef<HTMLInputElement>()

  const menuRef = useRef<HTMLUListElement>()
  const mobileBtnRef = useRef<HTMLButtonElement>()

  const handleCommentSubmit = () => {
    isValidComment(messageRef)? createComment() : rejectComment()
  }

  const handleJobClick = (index:number) => {
    setJobIndex(index)
  }

  const handleSortButton = () => {
    setIsSortedByRecent(prev => !prev)
  }

  const handleJobChange = {
    prev: () => {setJobIndex((prev) => prev > 0 ? prev-1 : jobsArray.length-1)},
    next: () => {setJobIndex((prev) => prev < jobsArray.length-1 ? prev+1 : 0)},
  }

  const createComment = async () => {
    await addDoc(commentsCollectionRef, {commentMessage: messageRef.current?.value.trim(), name: "Anonymous"+Math.ceil(Math.random()*1000), date: new Date()})
    if (messageRef.current) {
      messageRef.current.value = ""
    } 
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
      let comments:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      isSortedByRecent ? comments.sort((a:any, b:any) => b.date.seconds - a.date.seconds) : comments.sort((a:any, b:any) => a.date.seconds - b.date.seconds)
      setFirebaseItemsDB(comments)
      console.log(comments)
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
    getComments()
  }, [isSortedByRecent])

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if(!menuRef.current?.contains(e.target as HTMLUListElement) && !mobileBtnRef.current?.contains(e.target as HTMLButtonElement)){
        setShowMobileUL(false);
      }      
    }
    document.addEventListener("click", handler);
    
    return () =>{
      document.removeEventListener("click", handler);
    }
  }, []);
  
  useEffect(() => {
    let handler = (e: KeyboardEvent) => {
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

        <CommentComponent firebaseItemsDB={firebaseItemsDB} handleCommentSubmit={handleCommentSubmit} isSortedByRecent={isSortedByRecent} messageRef={messageRef} handleSortButton={handleSortButton} />

      </div>

      <FooterComponent />
    </>
  )
}

export default App
