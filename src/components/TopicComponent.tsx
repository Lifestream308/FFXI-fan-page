// import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { doc, addDoc, updateDoc, getDocs, query, where, } from "firebase/firestore"
import { topicCommentsCollectionRef } from "../util/FirebaseFunctions"
import { db } from '../util/firebase-config'
import { useDispatch } from 'react-redux'
import { modalShowingTrue } from '../redux/slices/isModalShowingSlice'

export default function TopicComponent({ forumTopics, setModalMessage, user }:any) {

  const dispatch = useDispatch()

  const [topicComments, setTopicComments] = useState<any>([])

  const { id } = useParams()

  const topic = forumTopics.find((topic: any) => topic.id == id)

  const commentRef = useRef<any>()

  const createTopicComment = async () => {
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
      // isSortedByRecent ? comments.sort((a:any, b:any) => b.date.seconds - a.date.seconds) : comments.sort((a:any, b:any) => a.date.seconds - b.date.seconds)
      comments.sort((a:any, b:any) => b.date.seconds - a.date.seconds)
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

  useEffect(() => {
    getTopicComments()
  }, [])

  return (
    <div className="mt-12 mx-auto px-4 max-w-5xl sm:px-0">
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

      <div className="my-10 pl-8 flex flex-col">
        <h3 className="text-stone-500">{ topicComments.length > 1 ? `${topicComments.length} comments below` : 'Comment below!' }</h3>
        <p className="text-stone-700">Sort By Recent</p>
      </div>

      { topicComments?.map((comment:any) => {
        return (
          <div className="mt-8 p-4 border-2 border-blue-200 rounded-xl" key={comment.id} >
              <div>
                <small className="text-gray-500">{comment.author}</small>
                <p className="text-lg">{comment.content}</p>
              </div>
          </div>
        )
      })}

      <div className="mt-8 px-4 flex flex-col gap-4 sm:px-0">
        <input type="text" className="px-2 py-1 max-w-2xl placeholder-gray-500 bg-slate-200 border border-gray-500 rounded-md" ref={commentRef} placeholder={ user? `What do you think ${user.displayName}?` : "Submit anonymous comment?"} />
        <button className="mt-4 px-2 py-2 text-white bg-green-700 w-fit rounded-md" onClick={() => createTopicComment()} >Submit Comment</button>
      </div>
    </div>
  )
}
