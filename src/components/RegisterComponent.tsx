// import React from 'react'

export default function RegisterComponent({register, usernameRef}:any) {

  return (
    <div className="my-4 flex flex-col items-center gap-4">
        <p className='px-2 text-lg text-center'>If registering for the first time, enter a username in addition to the email and password above.</p>
        <input type="text" ref={usernameRef} placeholder="Username" className="px-2 py-1 max-w-md placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" />
        <button onClick={() => register()} className="mt-4 px-4 py-2 w-fit text-white bg-blue-600 rounded-md" >Register</button>
    </div>
  )
}
