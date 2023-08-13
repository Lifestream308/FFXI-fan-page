// import React from 'react'
import { useRef } from 'react'
import { useParams, Link } from "react-router-dom"
import { addDoc } from "firebase/firestore"
import { topicCommentsCollectionRef } from "../util/FirebaseFunctions"

export default function TopicComponent({ forumTopics }:any) {

  const { id } = useParams()

  const topic = forumTopics.find((topic: any) => topic.id == id)

  const commentRef = useRef<any>()

  const createTopicComment = async () => {
    await addDoc(topicCommentsCollectionRef, {
      content: commentRef.current?.value.trim(), 
      author: "Anonymous"+Math.ceil(Math.random()*1000), 
      topicID: id,
      date: new Date()})
    if (commentRef.current) {
      commentRef.current.value = ""
    } 
    // getTopicComments()
    // setModalMessage("Comment Posted")
    // setIsModalShowing(true)
  }

  return (
    <div className="mt-12 mx-auto px-4 max-w-5xl sm:px-0">
      <div className="mt-8 p-8 border-2 border-blue-200 rounded-xl">
        <div className="flex flex-col gap-8">
          <Link to={'/forum'} className="text-blue-800 self-center underline underline-offset-4">Back to Forum</Link>
          <div>
            <h1 className="text-3xl text-neutral-700">{topic.title}</h1>
            <small className="text-gray-500">{ id }</small>
            <br />
            <small className="text-gray-500">3 Comments</small>
          </div>
          <hr />
          <p className="text-xl">{topic.content}</p>
        </div>
      </div>

      <div className="my-10 pl-8 flex flex-col">
        <h3 className="text-stone-500">All 3 Comments</h3>
        <p className="text-stone-700">Sort By Recent</p>
      </div>

      <div className="mt-8 p-4 border-2 border-blue-200 rounded-xl">
        <div>
          <small className="text-gray-500">Author2342</small>
          <p className="text-lg">Content Goes here</p>
        </div>
      </div>

      <div className="mt-8 px-4 flex flex-col gap-4 sm:px-0">
        <input type="text" className="px-4 py-2 max-w-2xl border rounded-md" ref={commentRef} placeholder="What Do You Think?" />
        <button className="px-2 py-2 text-white bg-green-600 w-fit border rounded-md" onClick={() => createTopicComment} >Submit Comment</button>
      </div>
    </div>
  )
}
