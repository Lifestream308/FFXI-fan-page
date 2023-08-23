// import React from 'react'
import { Link } from "react-router-dom"
import RegisterComponent from "./RegisterComponent"

export default function SignInPageComponent({user, credentials, register, login, logout}:any) {
  return (
      <div className="mt-8 flex flex-col items-center">
        <Link to={'/forum'} className="text-blue-800 self-center underline underline-offset-4">Back to Forum</Link>
        { user && 
        <div>
            <p className="mt-4 text-xl">Email: {user?.email}</p>
            <p className="mt-4 text-xl">UID: {user.uid}</p>
        </div>
        }
        <div className="mt-8 flex flex-col gap-4">
            <input type="text" ref={credentials.emailRef} placeholder="Email" className="px-2 py-1 max-w-md placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" />
            <input type="password" ref={credentials.passwordRef} placeholder="Password" className="px-2 py-1 max-w-md placeholder-gray-500 bg-slate-200 border-gray-500 border-[1px] rounded-md" />
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
            { !user && 
            <>
                <button onClick={login} className="px-4 py-2 w-fit text-white bg-green-700 rounded-md" >Login</button>
                <RegisterComponent register={register} />
            </> }
            { user && 
                <button onClick={logout} className="px-4 py-2 w-fit text-white bg-orange-600 rounded-md" >Logout</button>
            }
        </div>
    </div>
  )
}
