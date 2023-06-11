import { useState, useEffect } from 'react'
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import jobs from "./jobs"
import jobsArray from './jobsArray';
import BGSection from "./components/BGSection"
import CommentSection from './components/CommentSection'
import HeaderComponent from './components/HeaderComponent';
import JobComponent from './components/JobComponent';
import TableComponent from './components/TableComponent';

function App() {

  const [selectedJob, setSelectedJob] = useState<number>(0)

  const handleJobClick = (index) => {
    setSelectedJob(index)
  }

  const commentArray:string[] = ["Comment1", "Comment2", "Comment3"]

  const [firebaseItemsDB, setFirebaseItemsDB] = useState([])
  const commentsCollectionRef = collection(db, "commentsCollection")

  const getComments = async () => {
    const data = await getDocs(commentsCollectionRef);
    let firebaseArray:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setFirebaseItemsDB(firebaseArray);
    // console.log(firebaseArray)
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <>
      <HeaderComponent handleJobClick={handleJobClick} jobsArray={jobsArray} />

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
