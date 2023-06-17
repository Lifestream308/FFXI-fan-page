// import React from 'react'

export default function HeaderComponent({handleJobClick, jobsArray}:any) {
  return (
    <header className='sticky top-0 bg-white z-10'>
    <div className="flex px-[5%] justify-between items-center">
      <div className='flex max-w-[15rem] sm:max-w-full'>
        <img src="/images/icon1.jfif" alt="" className='inline-block h-auto min-w-[7rem] self-center sm:max-w-[10rem]' />
        <h1 className='text-3xl self-center hidden sm:flex'>Final Fantasy XI</h1>
      </div>
      <nav className='text-lg hidden sm:flex'>
        <a href="#about" className='p-4 hover:bg-gray-200 transition duration-300'>About</a>
        <a href="#comments" className='p-4 hover:bg-gray-200 transition duration-300'>Comments</a>
        <div className='nav__dropdown relative hover:bg-gray-200 transition duration-300'>
          <button type='button' className='p-4'>Jobs</button>
          <ul className='nav__dropdown-content absolute w-max bg-white shadow-md rounded-sm opacity-0 pointer-events-none -translate-y-3 transition'>
            
            {jobsArray.map((job:any, index:any) => {
              return <li key={job.name} className='hover:bg-gray-200'>
              <button type="button" className='px-4 block' onClick={() => handleJobClick(index)}>{job.name}</button></li>
            })}    
            
          </ul>
        </div>
      </nav>
      <nav className="text-lg sm:hidden">X</nav>
    </div>
    <hr />
  </header>
  )
}
