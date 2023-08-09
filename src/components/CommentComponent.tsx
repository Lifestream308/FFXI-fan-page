// import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"

export default function CommentComponent({anonymousComments, messageRef, isSortedByRecent, setIsSortedByRecent, handleCommentSubmit}:any) {

  const [page, setPage] = useState<number>(1)
  
  const commentsPerPage :number = 5
  const divisibleComments :number = Math.ceil((anonymousComments.length / commentsPerPage))
  const pagination :number[] = [...Array(divisibleComments).keys()]

  const prevPage = () => {
    if (page <= 1) return
    setPage(prev => prev-1)
  }
  const nextPage = () => {
    if (page >= divisibleComments) return
    setPage(prev => prev+1)
  }

  return (
    <section id="comments" className="flex justify-center">
      <div className="w-3/4 m-8 mt-14">
        <h2 className="text-2xl text-center mb-6">{anonymousComments.length} Comments</h2>
        <hr />
        <p className='my-8'>Welcome to the comment section. Comments must be between 4-250 characters long. Read and post anonymous comments here or create an account and have discussions over on the <Link to="/forum" className="text-blue-700">Forum</Link>!</p>
        <input type="text" placeholder="What do you think?" ref={messageRef} className="px-2 py-1 w-full placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" /> 
        <button type="button" onClick={()=> handleCommentSubmit()} className="mt-8 p-2 text-white bg-green-700 rounded-md">Post Comment</button>

        <div className="my-6 mb-3">
          <small className="text-gray-500">Sort by </small>
          <button className="text-gray-600 underline" onClick={() => setIsSortedByRecent((prev: boolean) => !prev)}>{isSortedByRecent ? "Recent" : "Oldest"}<span className="text-xs text-gray-500"><i className="bi bi-caret-down-fill"></i></span></button>
        </div>

        {anonymousComments.slice(commentsPerPage*(page-1), commentsPerPage*page).map((comment:any) => {
            return (
            <div className="mb-4" key={comment.id}>
              <small className="text-blue-800">{comment.name}</small>
              <p className="mb-6">{comment.commentMessage}</p>
              <hr />
            </div>
        )})}

      <div className='mt-12 flex flex-wrap justify-center'>

        <button onClick={() => prevPage()} className='m-1 px-3 py-2 text-xs text-gray-600 bg-stone-50 border border-gray-100 rounded-md shadow-md shadow-gray-500'><i className="bi bi-caret-left-fill"></i></button>

        {pagination.map((num) => {
          return (
            <button key={num} onClick={() => setPage(num+1)} className={'m-1 px-4 py-2 text-gray-600 bg-stone-50 border-2 rounded-md shadow-md shadow-gray-500' + (num+1 == page ? ' border-blue-700' : ' border-gray-100')}>{num+1}</button>
          )
        })}

        <button onClick={() => nextPage()} className='m-1 px-3 py-2 text-xs text-gray-600 bg-stone-50 border border-gray-100 rounded-md shadow-md shadow-gray-500'><i className="bi bi-caret-right-fill"></i></button>
      </div>

      </div>
    </section>
    )
}
