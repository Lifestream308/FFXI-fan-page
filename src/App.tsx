import { useState, useEffect, useRef,  } from 'react'
import { addDoc, getDocs } from "firebase/firestore";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Route, Routes, useLocation } from "react-router-dom"
import { isCorrectLength, commentsCollectionRef, forumPostsCollectionRef } from './util/FirebaseFunctions';
import AboutComponent from "./components/AboutComponent"
import HeaderComponent from './components/HeaderComponent';
import JobComponent from './components/JobComponent';
import ForumComponent from './components/ForumComponent';
import ModalComponent from './components/ModalComponent';
import FooterComponent from './components/FooterComponent';
import CommentLayout from './components/CommentLayout';

function App() {

  // jobIndex is passed to both JobComponent and to HeaderComponent. IsModalShowing and modalMessage passed multiple places so many components can activate the modal
  // isSortedByRecent is used in useEffect to getComments and the function getComment
  const [jobIndex, setJobIndex] = useState<number>(0)
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>("Modal Alert Active")
  const [isSortedByRecent, setIsSortedByRecent] = useState<boolean>(true)

  type comment = {
    commentMessage: string, 
    id: string,
    name: string, 
    date: Date
  }[]

  const [firebaseItemsDB, setFirebaseItemsDB] = useState<comment>([{commentMessage:"1", id: "4abcd", name:"test", date: new Date()}])
  const [forumPosts, setForumPosts] = useState<any>()

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
        createForumPost()
        return
      }
    } else {
      rejectTopic(4, 150, 4, 1000)
    }
  }

  const handleSortButton = () => {
    setIsSortedByRecent(prev => !prev)
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
    setIsModalShowing(true)
  }

  const createForumPost = async () => {
    await addDoc(forumPostsCollectionRef, {
      title: topicTitleRef.current?.value.trim(), 
      content: topicContentRef.current?.value.trim(), 
      author: "Anonymous"+Math.ceil(Math.random()*1000), 
      date: new Date(),
      numOfPosts: 0
    })
    if (topicTitleRef.current) {
      topicTitleRef.current.value = ""
    } 
    if (topicContentRef.current) {
      topicContentRef.current.value = ""
    } 
    getForumPosts()
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

  const getForumPosts = async () => {
    try {
      const data = await getDocs(forumPostsCollectionRef);
      let posts:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      isSortedByRecent ? posts.sort((a:any, b:any) => b.date.seconds - a.date.seconds) : posts.sort((a:any, b:any) => a.date.seconds - b.date.seconds)
      setForumPosts(posts)
      console.log(posts, forumPosts)
    }
    catch (err) {
      console.log("Something went wrong retrieving Forum posts.")
      console.log(err)
    }
  }

  // Below are UseEffects 
  useEffect(() => {
    getComments()
    getForumPosts()
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
          <Route element={ <CommentLayout firebaseItemsDB={firebaseItemsDB} handleCommentSubmit={handleCommentSubmit} isSortedByRecent={isSortedByRecent} messageRef={messageRef} handleSortButton={handleSortButton} />} >
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
