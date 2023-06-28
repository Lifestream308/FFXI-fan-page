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

  const [selectedJob, setSelectedJob] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>("Modal Alert Active")


  const handleCommentSubmit = () => {
    createComment()
  }

  const handleJobClick = (index:number) => {
    setSelectedJob(index)
  }

  const commentArray:string[] = ["Comment1", "Comment2", "Comment3"]

  // Firebase functionality
  const [firebaseItemsDB, setFirebaseItemsDB] = useState([])
  const commentsCollectionRef = collection(db, "commentsCollection")
  const messageRef = useRef<any>()

  // // Create comments
  const createComment = async () => {
    if (messageRef.current.value.trim().length > 250 || messageRef.current.value.trim().length < 4) {
      setModalMessage("Comment must be between 4-250 Characters")
      setShowModal(true)
      return
    }
    await addDoc(commentsCollectionRef, {commentMessage: messageRef.current.value.trim(), name: "Anonymous"+Math.ceil(Math.random()*100), date: new Date()})
    messageRef.current.value = ""
    getComments()
    setModalMessage("Comment Posted")
    setShowModal(true)
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

  const handlePrevClick = () => {
    console.log('click')
  }

  return (
    <>
      { showModal && <ModalComponent modalMessage={modalMessage} setShowModal={setShowModal} /> }

      <div className='max-w-7xl m-auto'>
        <HeaderComponent handleJobClick={handleJobClick} jobsArray={jobsArray} />

        <Routes>
          <Route path='/' element={ <JobComponent job={jobsArray[selectedJob]} handlePrevClick={handlePrevClick} /> } />
          <Route path='/about' element={ <BGSection /> } />
          <Route path='/forum' element={ <TableComponent /> } />
        </Routes>

        <CommentSection commentArray={commentArray} handleCommentSubmit={handleCommentSubmit} messageRef={messageRef} />
      </div>
    </>
  )
}

export default App
