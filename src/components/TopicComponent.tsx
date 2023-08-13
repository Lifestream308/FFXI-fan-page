// import React from 'react'
import { useParams, Link } from "react-router-dom"

export default function TopicComponent({ forumTopics }:any) {

    const { id } = useParams()

    const topic = forumTopics.find((topic: any) => topic.id == id)

  return (
    <>
    <div className="mt-8 mx-auto p-8 max-w-5xl border-2 border-blue-200 rounded-xl">
      <div className="flex flex-col gap-8">
        <Link to={'/forum'} className="text-blue-800 self-center underline underline-offset-4">Back to Forum</Link>
        <div>
          <h1 className="text-3xl text-neutral-700">{topic.title}</h1>
          <small className="text-gray-500">{ id }</small>
        </div>
        <hr />
        <p className="text-xl">{topic.content}</p>
      </div>
      </div>
    </>
  )
}
