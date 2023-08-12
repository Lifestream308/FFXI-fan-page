import { useState, useEffect, useRef,  } from 'react'
import { addDoc, getDocs } from "firebase/firestore";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { Route, Routes, useLocation } from "react-router-dom"
import { isCorrectLength, commentsCollectionRef, forumTopicsCollectionRef } from './util/FirebaseFunctions';
import { auth } from './util/firebase-config'
import { comment, topic } from './util/types';
import AboutComponent from "./components/AboutComponent"
import HeaderComponent from './components/HeaderComponent';
import JobComponent from './components/JobComponent';
import ForumComponent from './components/ForumComponent';
import ModalComponent from './components/ModalComponent';
import FooterComponent from './components/FooterComponent';
import CommentLayout from './components/CommentLayout';
import TopicComponent from './components/TopicComponent';

function App() {

  // This grouping needs to be in redux store
  const [jobIndex, setJobIndex] = useState<number>(0)
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>("Modal Alert Active")
  const [isSortedByRecent, setIsSortedByRecent] = useState<boolean>(true)

  const [anonymousComments, setAnonymousComments] = useState<comment>([{commentMessage:"1", id: "4abcd", name:"test", date: new Date()}])
  const [forumTopics, setForumTopics] = useState<topic>([{title:'Test', content: 'Testing', id: '1234', author: "John Doe", date: new Date(), numOfComments: 0}])

  const messageRef = useRef<HTMLInputElement>()
  const topicTitleRef = useRef<HTMLInputElement>()
  const topicContentRef = useRef<HTMLInputElement>()


  // Firebase Create/Register User, Login User, Guest Login, Logout User
  const [user, setUser] = useState<any>('initialUserState')

  const credentials = {
    emailRef : useRef({value:'initialEmailRef'}),
    passwordRef : useRef({value:'initialPasswordRef'})
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)

      // temporarily to get rid of errors with TS and what came with bringing in Firebase authentication functions
      console.log(user, register, login, logout,)
    })
  }, [])

  const register = async () => {
    try {
      // const user = await createUserWithEmailAndPassword(
      await createUserWithEmailAndPassword(
        auth,
        credentials.emailRef.current.value,
        credentials.passwordRef.current.value
      )
    } catch (error:any) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      // const user = await signInWithEmailAndPassword(
      await signInWithEmailAndPassword(
        auth,
        credentials.emailRef.current.value,
        credentials.passwordRef.current.value
      )
    } catch (error:any) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }
  // End of Firebase Register/Login/GuestLogin/Logout



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
      setAnonymousComments(comments)
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
      console.log(topics)
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
          <Route element={ <CommentLayout anonymousComments={anonymousComments} handleCommentSubmit={handleCommentSubmit} isSortedByRecent={isSortedByRecent} messageRef={messageRef} setIsSortedByRecent={setIsSortedByRecent} />} >
            <Route path='/' element={ <JobComponent setJobIndex={setJobIndex} jobIndex={jobIndex} /> } />
            <Route path='/about' element={ <AboutComponent /> } />
          </Route>
          <Route path='/forum' element={ <ForumComponent handleTopicSubmit={handleTopicSubmit} topicTitleRef={topicTitleRef} topicContentRef={topicContentRef} forumTopics={forumTopics} /> } />
          <Route path='/forum/:id' element={ <TopicComponent forumTopics={forumTopics} /> } />
        </Routes>
      </div>

      <FooterComponent />
    </>
  )
}

export default App
