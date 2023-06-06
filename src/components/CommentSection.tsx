// import React from 'react'

export default function CommentSection({commentArray}:any) {
  return (
    <section className="flex justify-center mt-6">
    <div className="w-3/4 m-8">
      <h2 className="text-2xl text-center mb-6">{commentArray.length} Comments</h2>
      <hr />
      <p className='my-6'>Welcome to the comment section! Comments must be between 4-250 characters long. Drop a "Hello World" and thank you for stopping by.</p>
      <input type="text" placeholder="What do you think?" className="px-2 py-1 w-full bg-slate-200 border-gray-500 border-[1px] rounded-md" />
      {commentArray.map((comment:string) => <p className='mt-6' key={comment}>{comment}</p>)}
    </div>
  </section>
    )
}
