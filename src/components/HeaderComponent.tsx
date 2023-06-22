// import React from 'react'
import { useState } from 'react'

export default function HeaderComponent({handleJobClick, jobsArray}:any) {

  const [showMobileUL, setShowMobileUL] = useState<boolean>(false)

  return (
    <header className='sticky top-0 bg-white z-10'>
      <div className="flex px-[5%] justify-between items-center">
        <div className='flex max-w-[15rem] sm:max-w-full'>
          <a href=""><img src="/images/icon1.jfif" alt="" className='inline-block h-auto w-[12rem] self-center' /></a>
          <h1 className='text-3xl self-center hidden md:flex'>Final Fantasy XI</h1>
        </div>
        <nav className='text-lg hidden sm:flex'>
          <a href="#about" className='p-4 hover:bg-gray-200 transition duration-300'>About</a>
          <a href="#comments" className='p-4 hover:bg-gray-200 transition duration-300'>Comments</a>
          <div className='nav__dropdown relative hover:bg-gray-200 transition duration-300'>
            <button type='button' className='p-4'>Jobs</button>
            <ul className='nav__dropdown-content absolute w-max bg-white shadow-md rounded-sm opacity-0 pointer-events-none -translate-y-3 transition'>
              
              {jobsArray.map((job:any, index:number) => {
                return <li key={job.name} className='hover:bg-gray-200'>
                <button type="button" className='px-4 block' onClick={() => handleJobClick(index)}>{job.name}</button></li>
                })}
              
            </ul>
          </div>
        </nav>
        <button type="button" onClick={()=> {setShowMobileUL(prev => !prev)}} className="text-3xl p-2 sm:hidden"><i className="bi bi-list"></i></button>
      </div>
      <hr />
      <nav className="relative">
        { showMobileUL && <ul className="fixed bg-white right-0 top-[7rem] sm:hidden">
            {jobsArray.map((job:any, index:number) => {
              return <li key={job.name} className='w-full hover:bg-gray-200'>
              <button type="button" className='w-full px-4 block' onClick={() => handleJobClick(index)}>{job.name}</button></li>
              })}


          </ul>}
      </nav>
    </header>
  )
}
