import { useState, useEffect } from 'react'
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import jobs from "./jobs"
import jobsArray from './jobsArray';
import BGSection from "./components/BGSection"
import CommentSection from './components/CommentSection'
import HeaderComponent from './components/HeaderComponent';
import JobComponent from './components/JobComponent';
import TableComponent from './components/TableComponent';
import RoundTable from './components/RoundTable';
import RoundTable2 from './components/RoundTable2';

function App() {

  console.log(jobsArray)

  const [selectedJob, setSelectedJob] = useState(jobs.war)

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
      <HeaderComponent setSelectedJob={setSelectedJob} jobs={jobs} />

      {/* do I need a useState for selectedJob? and job inside JobComponent will rerender onchange */}
      {/* maybe add carousel wheel with selected job in bold big letters, next/prev in small text */}
      <JobComponent job={selectedJob} />

      <BGSection />

      <CommentSection commentArray={commentArray} />

      <TableComponent />

      <RoundTable />

      <RoundTable2 />
    </>
  )
}

export default App
