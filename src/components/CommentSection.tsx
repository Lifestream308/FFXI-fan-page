// import React from 'react'

export default function CommentSection({commentArray, messageRef}:any) {
  return (
    <section className="flex justify-center mt-6">
    <div className="w-3/4 m-8">
      <h2 className="text-2xl text-center mb-6">{commentArray.length} Comments</h2>
      <hr />
      <p className='my-6'>Welcome to the comment section. Comments must be between 4-250 characters long. Read and post anonymous comments here or create an account and have discussions over on the <a href="" className="text-blue-700">Forum</a>!</p>
      <input type="text" placeholder="What do you think?" className="px-2 py-1 w-full placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" ref={messageRef} />
      {commentArray.map((comment:string) => <p className='mt-6' key={comment}>{comment}</p>)}
    </div>
  </section>
    )
}
