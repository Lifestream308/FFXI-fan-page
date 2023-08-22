// import React from 'react'

export default function TopicFormComponent({handleTopicSubmit, topicTitleRef, topicContentRef}:any) {
  return (
    <>
        <div className="my-12 text-center">
            <input type="text" placeholder="Title" ref={topicTitleRef} className="m-4 border border-black" />
            <br />
            <input type="text" placeholder="Content" ref={topicContentRef} className="m-4 border border-black" />
            <br />
            <button type="button" onClick={()=> handleTopicSubmit()} className="m-4 p-2 text-white bg-green-700 rounded-md">Submit Topic</button>
        </div>
    </>
  )
}
