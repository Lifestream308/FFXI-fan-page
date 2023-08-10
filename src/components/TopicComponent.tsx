// import React from 'react'
import { useParams, Link } from "react-router-dom"

export default function TopicComponent({ forumTopics }:any) {

    const { id } = useParams()

    const topic = forumTopics.find((topic: any) => topic.id == id)

  return (
    <>
      <div className="mt-8 flex flex-col gap-8">
        <Link to={'/forum'} className="text-blue-800 self-center">Back to Forum</Link>
        <p>{ id }</p>
        <h1 className="text-3xl">{topic.title}</h1>
        <p>{topic.content}</p>
      </div>
    </>
  )
}
