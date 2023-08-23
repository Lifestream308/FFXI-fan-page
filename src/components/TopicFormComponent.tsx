// import React from 'react'
import { Link } from "react-router-dom"

export default function TopicFormComponent({handleTopicSubmit, topicTitleRef, topicContentRef}:any) {
  return (
    <>
      <div className="mt-8 text-center">
        <Link to={'/forum'} className="text-blue-800 self-center underline underline-offset-4">Back to Forum</Link>
      </div>
      <div className="mt-8 mb-12 flex flex-col items-center gap-4">
        <input type="text" placeholder="Title" ref={topicTitleRef} className="px-2 py-1 max-w-md placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" />
        <input type="text" placeholder="Content" ref={topicContentRef} className="px-2 py-1 max-w-md placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" />
        <button type="button" onClick={()=> handleTopicSubmit()} className="m-4 p-2 text-white bg-green-700 rounded-md">Submit Topic</button>
      </div>
    </>
  )
}
