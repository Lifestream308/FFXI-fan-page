import { useState, useEffect, useRef } from 'react'
import { db } from "./firebase-config"
import { collection, getDocs, addDoc } from "firebase/firestore";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Route, Routes } from "react-router-dom"
import jobsArray from './jobsArray';
import BGSection from "./components/BGSection"
import CommentSection from './components/CommentSection'
import HeaderComponent from './components/HeaderComponent';
import JobComponent from './components/JobComponent';
import TableComponent from './components/TableComponent';
import ModalComponent from './components/ModalComponent';

function App() {

  const [jobIndex, setJobIndex] = useState<number>(0)
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>("Modal Alert Active")
  const [showMobileUL, setShowMobileUL] = useState<boolean>(false)

  const menuRef = useRef<any>()

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
  const messageRef = useRef<any>()

  // // Create comments
  const isValidComment = () => {
    if (messageRef.current.value.trim().length > 250 || messageRef.current.value.trim().length < 4) {
      return false
    } else {
      return true
    }
  }

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
      if(!menuRef.current.contains(e.target)){
        setShowMobileUL(false);
        console.log(menuRef.current);
      }      
    }

    document.addEventListener("mousedown", handler);
    
    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <>
      { isModalShowing && <ModalComponent modalMessage={modalMessage} setIsModalShowing={setIsModalShowing} /> }

      <div className='max-w-7xl m-auto'>
        <HeaderComponent handleJobClick={handleJobClick} jobsArray={jobsArray} menuRef={menuRef} showMobileUL={showMobileUL} setShowMobileUL={setShowMobileUL} />

        <Routes>
          <Route path='/' element={ <JobComponent job={jobsArray[jobIndex]} handleJobChange={handleJobChange} jobIndex={jobIndex} jobsArray={jobsArray} /> } />
          <Route path='/about' element={ <BGSection /> } />
          <Route path='/forum' element={ <TableComponent /> } />
        </Routes>

        <CommentSection commentArray={commentArray} handleCommentSubmit={handleCommentSubmit} messageRef={messageRef} />
      </div>
    </>
  )
}

export default App
