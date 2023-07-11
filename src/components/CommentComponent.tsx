// import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"

export default function CommentComponent({firebaseItemsDB, messageRef, isSortedByRecent, handleSortButton, handleCommentSubmit}:any) {

  const [page, setPage] = useState<number>(1)
  
  const commentsPerPage:number = 5

  return (
    <section id="comments" className="flex justify-center">
      <div className="w-3/4 m-8 mt-14">
        <h2 className="text-2xl text-center mb-6">{firebaseItemsDB.length} Comments</h2>
        <hr />
        <p className='my-6'>Welcome to the comment section. Comments must be between 4-250 characters long. Read and post anonymous comments here or create an account and have discussions over on the <Link to="/forum" className="text-blue-700">Forum</Link>!</p>
        <input type="text" placeholder="What do you think?" ref={messageRef} className="px-2 py-1 w-full placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" /> 
        <button type="button" onClick={()=> handleCommentSubmit()} className="mt-6 p-2 text-white bg-green-700 rounded-md">Post Comment</button>

        <div className="my-6 mb-3">
          <small className="text-gray-500">Sort by </small>
          <button className="text-gray-600 underline" onClick={handleSortButton}>{isSortedByRecent ? "Recent" : "Oldest"}<span className="text-xs text-gray-500"><i className="bi bi-caret-down-fill"></i></span></button>
        </div>

        {firebaseItemsDB.slice(commentsPerPage*(page-1), commentsPerPage*page).map((comment:any) => {
            return (
            <div className="mb-4" key={comment.id}>
              <small className="text-blue-800">{comment.name}</small>
              <p className="mb-6">{comment.commentMessage}</p>
              <hr />
            </div>
        )})}

      <div className="mt-6">
        <button>1</button>
        <button onClick={() => setPage(2)}>2</button>
        <button>3</button>
      </div>

      </div>
    </section>
    )
}
