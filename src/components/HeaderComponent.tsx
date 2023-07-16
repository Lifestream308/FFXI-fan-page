// import React from 'react'
// import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function HeaderComponent({handleJobClick, jobsArray, menuRef, mobileBtnRef, showMobileUL, setShowMobileUL}:any) {

  // const [showMobileUL, setShowMobileUL] = useState<boolean>(false)

  return (
    <header className='sticky top-0 bg-white z-10'>
      <div className="flex px-[5%] justify-between items-center">
        <div className='flex max-w-[15rem] sm:max-w-full'>
          <Link to="/"><img src="/images/icon1.jfif" alt="" className='inline-block h-auto w-[12rem] self-center' /></Link>
        </div>
        <nav className='text-lg hidden sm:flex'>
          <Link to="/" className='p-4 hover:bg-gray-200 transition duration-300'>Home</Link>
          <Link to="/about" className='p-4 hover:bg-gray-200 transition duration-300'>About</Link>
          <Link to="/forum" className='p-4 hover:bg-gray-200 transition duration-300'>Forum</Link>
          <div className='nav__dropdown relative hover:bg-gray-200 transition duration-300'>
            <button type='button' className='p-4'>Jobs
            <span className='text-gray-500 text-sm'> <i className="bi bi-caret-down-fill"></i></span></button>
            <ul className='nav__dropdown-content absolute w-max bg-white shadow-md rounded-sm opacity-0 pointer-events-none -translate-y-3 transition'>
              
              {jobsArray.map((job:any, index:number) => {
                return <li key={job.name} className='hover:bg-gray-200'>
                <Link to="/" className='px-3 block' onClick={() => handleJobClick(index)}>{job.name}</Link></li>
                })}
              
            </ul>
          </div>
        </nav>
        <button type="button" ref={mobileBtnRef} onClick={() => {setShowMobileUL((prev: any) => !prev)}} className="text-3xl p-2 sm:hidden"><i className="bi bi-list"></i></button>
      </div>
      <hr />
      <nav className="relative text-lg">
        { showMobileUL && <ul ref={menuRef} className="fixed bg-white right-0 top-[6.75rem] sm:hidden">
          
          <li className='w-full hover:bg-gray-200'><Link to="/" className='w-full px-4 block'>Home</Link></li>
          <li className='w-full hover:bg-gray-200'><Link to="/about" className='w-full px-4 block'>About</Link></li>
          <li className='w-full hover:bg-gray-200'><Link to="/forum" className='w-full px-4 block'>Forum</Link></li>

          {jobsArray.map((job:any, index:number) => {
            return <li key={job.name} className='w-full hover:bg-gray-200'>
            <Link to="/" className='w-full px-4 block' onClick={() => handleJobClick(index)}>{job.name}</Link></li>
            })}


          </ul>}
      </nav>
    </header>
  )
}
