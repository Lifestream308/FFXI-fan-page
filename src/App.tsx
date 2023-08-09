import { useState, useEffect, useRef,  } from 'react'
import { addDoc, getDocs } from "firebase/firestore";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Route, Routes, useLocation } from "react-router-dom"
import { isCorrectLength, commentsCollectionRef, forumTopicsCollectionRef } from './util/FirebaseFunctions';
import { comment } from './util/types';
import AboutComponent from "./components/AboutComponent"
import HeaderComponent from './components/HeaderComponent';
import JobComponent from './components/JobComponent';
import ForumComponent from './components/ForumComponent';
import ModalComponent from './components/ModalComponent';
import FooterComponent from './components/FooterComponent';
import CommentLayout from './components/CommentLayout';

function App() {

  // This grouping needs to be in redux store
  const [jobIndex, setJobIndex] = useState<number>(0)
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>("Modal Alert Active")
  const [isSortedByRecent, setIsSortedByRecent] = useState<boolean>(true)

  const [firebaseItemsDB, setFirebaseItemsDB] = useState<comment>([{commentMessage:"1", id: "4abcd", name:"test", date: new Date()}])
  const [forumTopics, setForumTopics] = useState<any>()

  const messageRef = useRef<HTMLInputElement>()
  const topicTitleRef = useRef<HTMLInputElement>()
  const topicContentRef = useRef<HTMLInputElement>()

  const handleCommentSubmit = () => {
    if (messageRef.current && isCorrectLength(messageRef.current.value, 4, 250)) {
      createComment()
    } else {
      rejectComment(4, 250)
    }
  }

  const handleTopicSubmit = () => {
    if (topicTitleRef.current && isCorrectLength(topicTitleRef.current.value, 4, 150)) {
      if (topicContentRef.current && isCorrectLength(topicContentRef.current.value, 4, 1000)) {
        createForumTopic()
        return
      }
    } else {
      rejectTopic(4, 150, 4, 1000)
    }
  }

  // createAnonymousComment?
  const createComment = async () => {
    await addDoc(commentsCollectionRef, {
      commentMessage: messageRef.current?.value.trim(), 
      name: "Anonymous"+Math.ceil(Math.random()*1000), 
      date: new Date()})
    if (messageRef.current) {
      messageRef.current.value = ""
    } 
    getComments()
    setModalMessage("Comment Posted")
    setIsModalShowing(true)
  }

  const createForumTopic = async () => {
    await addDoc(forumTopicsCollectionRef, {
      title: topicTitleRef.current?.value.trim(), 
      content: topicContentRef.current?.value.trim(), 
      author: "Anonymous"+Math.ceil(Math.random()*1000), 
      date: new Date(),
      numOfComments: 0
    })
    if (topicTitleRef.current) {
      topicTitleRef.current.value = ""
    } 
    if (topicContentRef.current) {
      topicContentRef.current.value = ""
    } 
    getForumTopics()
    setModalMessage("Topic Posted")
    setIsModalShowing(true)
  }

  const rejectComment = (min:number, max:number) => {
    setModalMessage(`Comment must be between ${min}-${max} characters long.`)
    setIsModalShowing(true)
  }

  const rejectTopic = (minTitle:number, maxTitle:number, minContent: number, maxContent: number) => {
    setModalMessage(`Title must be between ${minTitle}-${maxTitle} characters long. Content must be between ${minContent}-${maxContent} characters long.`)
    setIsModalShowing(true)
  }

  // needs interface or type for the array of comments that are coming in from firebase
  const getComments = async () => {
    try {
      const data = await getDocs(commentsCollectionRef);
      let comments:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      isSortedByRecent ? comments.sort((a:any, b:any) => b.date.seconds - a.date.seconds) : comments.sort((a:any, b:any) => a.date.seconds - b.date.seconds)
      setFirebaseItemsDB(comments)
    }
    catch (err) {
      console.log("Something went wrong retrieving comments.")
      console.log(err)
    }
  }

  const getForumTopics = async () => {
    try {
      const data = await getDocs(forumTopicsCollectionRef);
      let topics:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      isSortedByRecent ? topics.sort((a:any, b:any) => b.date.seconds - a.date.seconds) : topics.sort((a:any, b:any) => a.date.seconds - b.date.seconds)
      setForumTopics(topics)
      console.log(topics, forumTopics)
    }
    catch (err) {
      console.log("Something went wrong retrieving Forum Topics.")
      console.log(err)
    }
  }

  // Below are UseEffects 
  useEffect(() => {
    getComments()
    getForumTopics()
  }, [])

  useEffect(() => {
    getComments()
  }, [isSortedByRecent])

  const location = useLocation()  
  useEffect(() => {
    window.scrollTo(0,0)
}, [location.pathname])

  return (
    <>
      { isModalShowing && <ModalComponent modalMessage={modalMessage} setIsModalShowing={setIsModalShowing} /> }

      <div className='max-w-7xl m-auto'>
        <HeaderComponent setJobIndex={setJobIndex} />

        <Routes>
          <Route element={ <CommentLayout firebaseItemsDB={firebaseItemsDB} handleCommentSubmit={handleCommentSubmit} isSortedByRecent={isSortedByRecent} messageRef={messageRef} setIsSortedByRecent={setIsSortedByRecent} />} >
            <Route path='/' element={ <JobComponent setJobIndex={setJobIndex} jobIndex={jobIndex} /> } />
            <Route path='/about' element={ <AboutComponent /> } />
          </Route>


          <Route path='/forum' element={ <ForumComponent handleTopicSubmit={handleTopicSubmit} topicTitleRef={topicTitleRef} topicContentRef={topicContentRef} /> } />
        </Routes>

      </div>

      <FooterComponent />
    </>
  )
}

export default App
