// import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { doc, addDoc, updateDoc, getDocs, query, where, } from "firebase/firestore"
import { topicCommentsCollectionRef } from "../util/FirebaseFunctions"
import { db } from '../util/firebase-config'
import { useDispatch } from 'react-redux'
import { modalShowingTrue } from '../redux/slices/isModalShowingSlice'

export default function TopicComponent({ forumTopics, setModalMessage, user, logout }:any) {

  const dispatch = useDispatch()

  const [topicComments, setTopicComments] = useState<any>([])

  const { id } = useParams()

  const topic = forumTopics.find((topic: any) => topic.id == id)

  const [isSortedByRecent, setIsSortedByRecent] = useState<boolean>(true)

  const commentRef = useRef<any>()

  const createTopicComment = async () => {
    if (commentRef.current.value.trim() == "") {
      setModalMessage("Enter message to submit")
      dispatch(modalShowingTrue())
      return
    }
    await addDoc(topicCommentsCollectionRef, {
      content: commentRef.current?.value.trim(), 
      author: user? user.displayName : "Anonymous"+Math.ceil(Math.random()*1000), 
      topicID: id,
      date: new Date()})
    if (commentRef.current) {
      commentRef.current.value = ""
    } 
    getTopicComments()
    updateNumberOfTopicComments(id)
    setModalMessage("Comment Posted")
    dispatch(modalShowingTrue())
  }
  
  const getTopicComments = async () => {
    const queryComments = query(topicCommentsCollectionRef, where("topicID", "==", id))
    try {
      const data = await getDocs(queryComments);
      let comments:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      isSortedByRecent ? comments.sort((a:any, b:any) => b.date.seconds - a.date.seconds) : comments.sort((a:any, b:any) => a.date.seconds - b.date.seconds)
      // comments.sort((a:any, b:any) => b.date.seconds - a.date.seconds)
      setTopicComments(comments)
    }
    catch (err) {
      console.log("Something went wrong retrieving topic comments.")
      console.log(err)
    }
  }

  const updateNumberOfTopicComments = async (id:any) => {

    const topicDoc = doc(db, "forumTopics", id)
    const newFields = { numOfComments: topicComments.length + 1 }
    await updateDoc(topicDoc, newFields)
  }

  const [page, setPage] = useState<number>(1)
  
  const commentsPerPage :number = 5
  const divisibleComments :number = Math.ceil((topicComments.length / commentsPerPage))
  const pagination :number[] = [...Array(divisibleComments).keys()]

  const prevPage = () => {
    if (page <= 1) return
    setPage(prev => prev-1)
  }
  const nextPage = () => {
    if (page >= divisibleComments) return
    setPage(prev => prev+1)
  }

  useEffect(() => {
    getTopicComments()
  }, [])

  useEffect(() => {
    getTopicComments()
  }, [isSortedByRecent])

  return (
    <div className="mt-12 mb-16 mx-auto px-4 max-w-5xl">

      { !user && 
        <div className='mt-[-1rem] flex justify-end'>
          <Link to={'/SignIn'} className="p-2 text-white bg-blue-800 rounded-md">Sign In <span className="py-1"><i className="bi bi-person-fill"></i></span></Link>
        </div>
      }
      { user && 
        <div className='mt-[-1rem] flex gap-2 justify-end'>
          <p className='text-xl'>{ user.displayName }</p>
          <button onClick={logout} className="px-4 py-2 w-fit text-xs text-white bg-orange-600 rounded-md" >Logout <i className="bi bi-person-fill-slash"></i></button>
        </div>
      }
      <div className="mt-8 p-8 border-2 border-blue-200 rounded-xl">
        <div className="flex flex-col gap-8">
          <Link to={'/forum'} className="text-blue-800 self-center underline underline-offset-4">Back to Forum</Link>
          <div>
            <h1 className="text-3xl text-neutral-700">{topic?.title}</h1>
            <small className="text-gray-500">{ topic?.author }</small>
            <br />
            <small className="text-gray-500">{topicComments && topicComments.length} {topicComments.length == 1 ? 'Comment':'Comments'}</small>
          </div>
          <hr />
          <p className="text-xl">{topic?.content}</p>
        </div>
      </div>

      <div className="my-8 pl-8 flex flex-col">
        <h3 className="text-stone-500">{ topicComments.length > 1 ? `${topicComments.length} comments below` : 'Comment below!' }</h3>
        <div className="mt-2">
          <small className="text-gray-500">Sort by </small>
          <button className="text-gray-600 underline" onClick={() => setIsSortedByRecent((prev: boolean) => !prev)}>{isSortedByRecent ? "Recent" : "Oldest"}<span className="text-xs text-gray-500"><i className="bi bi-caret-down-fill"></i></span></button>
        </div>
      </div>

      { topicComments?.slice(commentsPerPage*(page-1), commentsPerPage*page).map((comment:any) => {
        return (
          <div className="mt-8 p-4 border-2 border-blue-200 rounded-xl" key={comment.id} >
              <div>
                <small className="text-gray-500">{comment.author}</small>
                <p className="text-lg">{comment.content}</p>
              </div>
          </div>
        )
      })}
      <div className='mt-8 flex flex-wrap justify-center'>
        <button onClick={() => prevPage()} className='m-1 px-3 py-2 text-xs text-gray-600 bg-stone-50 border border-gray-100 rounded-md shadow-md shadow-gray-500'><i className="bi bi-caret-left-fill"></i></button>
        
        {pagination.map((num) => {
          return (
            <button key={num} onClick={() => setPage(num+1)} className={'m-1 px-4 py-2 text-gray-600 bg-stone-50 border-2 rounded-md shadow-md shadow-gray-500' + (num+1 == page ? ' border-blue-700' : ' border-gray-100')}>{num+1}</button>
          )
        })}
        <button onClick={() => nextPage()} className='m-1 px-3 py-2 text-xs text-gray-600 bg-stone-50 border border-gray-100 rounded-md shadow-md shadow-gray-500'><i className="bi bi-caret-right-fill"></i></button>
      </div>

      <div className="mt-12 px-4 flex flex-col gap-4 sm:px-0">
        <input type="text" className="px-2 py-1 max-w-2xl placeholder-gray-500 bg-slate-200 border border-gray-500 rounded-md" ref={commentRef} placeholder={ user? `What do you think ${user.displayName}?` : "Submit anonymous comment?"} />
        <button className="mt-4 px-2 py-2 text-white bg-green-700 w-fit rounded-md" onClick={() => createTopicComment()} >Submit Comment</button>
      </div>
    </div>
  )
}
