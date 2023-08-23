// import React from 'react'
import { useRef } from 'react'

export default function RegisterComponent({register}:any) {

    const usernameRef = useRef<any>()

  return (
    <div className="my-4 flex flex-col items-center gap-4">
        <p className='text-lg'>If registering for the first time, enter a username in addition to the email and password above.</p>
        <input type="text" ref={usernameRef} placeholder="Username" className="px-2 py-1 max-w-md placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" />
        <button onClick={register} className="px-4 py-2 w-fit text-white bg-blue-600 rounded-md" >Register</button>
    </div>
  )
}
