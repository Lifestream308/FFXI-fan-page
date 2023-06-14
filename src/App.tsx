import { useState, useEffect, useRef } from 'react'
// import { db } from "./firebase-config"
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import jobsArray from './jobsArray';
import BGSection from "./components/BGSection"
import CommentSection from './components/CommentSection'
import HeaderComponent from './components/HeaderComponent';
import JobComponent from './components/JobComponent';
import TableComponent from './components/TableComponent';
import ModalComponent from './components/ModalComponent';

function App() {

  const [selectedJob, setSelectedJob] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(true)

  const modalMessage:string = "Modal Alert Active"

  const handleJobClick = (index) => {
    setSelectedJob(index)
  }

  const commentArray:string[] = ["Comment1", "Comment2", "Comment3"]

  // Commented out all firebase functionality to try to see if that fixes netlify deploy. useRef / messageRef const needs fixing

  // Firebase functionality
  // const [firebaseItemsDB, setFirebaseItemsDB] = useState([])
  // const commentsCollectionRef = collection(db, "commentsCollection")
  // const messageRef = useRef

  // // Create comments
  // const createItem = async () => {
  //   // const filteredItems = firebaseItemsDB.filter(registerItem => registerItem.companyEmail === user.email)
  //   // const filteredNames = Array.from(filteredItems, a => a.menuItemName)

  //   if (messageRef.current.value.trim().length > 250 || messageRef.current.value.trim().length < 4) {
  //     alert("Message must be between 4-250 Characters")
  //     return
  //   }
  //   await addDoc(commentsCollectionRef, {commentMessage: messageRef.current.value.trim(), name: "Anonymous"+Math.random()*100})
  //   getComments()
  // }

  // // Read all comments
  // const getComments = async () => {
  //   const data = await getDocs(commentsCollectionRef);
  //   let firebaseArray:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //   setFirebaseItemsDB(firebaseArray);
  //   console.log(firebaseArray)
  // }

  // useEffect(() => {
  //   getComments()
  // }, [])

  return (
    <>
      <HeaderComponent handleJobClick={handleJobClick} jobsArray={jobsArray} />

      { showModal && <ModalComponent modalMessage={modalMessage} setShowModal={setShowModal} /> }

      {/* do I need a useState for selectedJob? and job inside JobComponent will rerender onchange */}
      {/* maybe add carousel wheel with selected job in bold big letters, next/prev in small text */}
      <JobComponent job={jobsArray[selectedJob]} />

      <BGSection />

      <CommentSection commentArray={commentArray} />

      <TableComponent />
    </>
  )
}

export default App
