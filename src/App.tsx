import { useState, useEffect, useRef,  } from 'react'
import { addDoc, getDocs } from "firebase/firestore";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
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
import { RootState } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { modalShowingTrue } from './redux/slices/isModalShowingSlice';
import TopicFormComponent from './components/TopicFormComponent';
import SignInPageComponent from './components/SignInPageComponent';

function App() {

  const isModalShowing = useSelector((state: RootState) => state.isModalShowing.value)
  const dispatch = useDispatch()
  
  // This grouping needs to be in redux store
  const [modalMessage, setModalMessage] = useState<string>("Modal Alert Active")
  const [isSortedByRecent, setIsSortedByRecent] = useState<boolean>(true)

  const [anonymousComments, setAnonymousComments] = useState<comment>([{commentMessage:"1", id: "4abcd", name:"test", date: new Date()}])
  const [forumTopics, setForumTopics] = useState<topic>([{title:'Test', content: 'Testing', id: '1234', author: "John Doe", date: new Date(), numOfComments: 0}])

  const messageRef = useRef<HTMLInputElement>()
  const topicTitleRef = useRef<HTMLInputElement>()
  const topicContentRef = useRef<HTMLInputElement>()

  const navigate = useNavigate()

  // Firebase Create/Register User, Login User, Guest Login, Logout User
  const [user, setUser] = useState<any>('initialUserState')
  const [isNewUser, setIsNewUser] = useState<boolean>(false)

  const credentials = {
    emailRef : useRef({value:'initialEmailRef'}),
    passwordRef : useRef({value:'initialPasswordRef'})
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser:any) => {
      setUser(currentUser)
      console.log(currentUser)
      if (isNewUser) {
        updateProfile(currentUser, {
          displayName: "Jane"
        })
        setIsNewUser(false)
      }
    })
  }, [])

  const register = async () => {
    try {
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
    dispatch(modalShowingTrue())
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
    // getForumTopics()
    setModalMessage("Topic Posted")
    dispatch(modalShowingTrue())
    navigate("/forum")
  }

  const rejectComment = (min:number, max:number) => {
    setModalMessage(`Comment must be between ${min}-${max} characters long.`)
    dispatch(modalShowingTrue())
  }

  const rejectTopic = (minTitle:number, maxTitle:number, minContent: number, maxContent: number) => {
    setModalMessage(`Title must be between ${minTitle}-${maxTitle} characters long. Content must be between ${minContent}-${maxContent} characters long.`)
    dispatch(modalShowingTrue())
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
      { isModalShowing && <ModalComponent modalMessage={modalMessage} /> }

      <div className='max-w-7xl m-auto'>
        <HeaderComponent />

        <Routes>
          <Route element={ <CommentLayout anonymousComments={anonymousComments} handleCommentSubmit={handleCommentSubmit} isSortedByRecent={isSortedByRecent} messageRef={messageRef} setIsSortedByRecent={setIsSortedByRecent} />} >
            <Route path='/' element={ <JobComponent /> } />
            <Route path='/about' element={ <AboutComponent /> } />
          </Route>
          <Route path='/forum' element={ <ForumComponent handleTopicSubmit={handleTopicSubmit} topicTitleRef={topicTitleRef} topicContentRef={topicContentRef} forumTopics={forumTopics} getForumTopics={getForumTopics} /> } />
          <Route path='/forum/:id' element={ <TopicComponent forumTopics={forumTopics} setModalMessage={setModalMessage} /> } />
          <Route path='/forum/NewTopic' element={ <TopicFormComponent handleTopicSubmit={handleTopicSubmit} topicTitleRef={topicTitleRef} topicContentRef={topicContentRef} /> } />
          <Route path='/SignIn' element={ <SignInPageComponent user={user} credentials={credentials} register={register} login={login} logout={logout} /> } />
        </Routes>
      </div>

      <FooterComponent />
    </>
  )
}

export default App
