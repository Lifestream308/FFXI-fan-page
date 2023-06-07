// import React from 'react'

export default function HeaderComponent({setSelectedJob, jobs}:any) {
  return (
    <header className='sticky top-0 bg-white z-10'>
    <div className="flex px-24 justify-between items-center">
      <div className='flex'>
        <img src="/images/icon1.jfif" alt="" className='inline-block h-8 self-end' />
        <h1 className='text-3xl'>Final Fantasy XI</h1>
      </div>
      <nav className='flex text-lg'>
        <a href="" className='p-4 hover:bg-gray-200 transition duration-300'>Project</a>
        <a href="" className='p-4 hover:bg-gray-200 transition duration-300'>History</a>
        <div className='nav__dropdown relative hover:bg-gray-200 transition duration-300'>
          <button type='button' className='p-4'>Jobs</button>
          <ul className='nav__dropdown-content absolute w-max bg-white shadow-md rounded-sm opacity-0 pointer-events-none -translate-y-3 transition'>
            <li className='hover:bg-gray-200'>
              <button type="button" className='px-4 block' onClick={() => setSelectedJob(jobs.war)}>Warrior</button></li>
            <li className='hover:bg-gray-200'>
              <button type="button" className='px-4 block' onClick={() => setSelectedJob(jobs.thf)}>Thief</button></li>
            <li className='hover:bg-gray-200'>
              <button type="button" className='px-4 block' onClick={() => setSelectedJob(jobs.mnk)}>Monk</button></li>
            <li className='hover:bg-gray-200'>
              <button type="button" className='px-4 block' onClick={() => setSelectedJob(jobs.whm)}>White Mage</button></li>
            <li className='hover:bg-gray-200'>
              <button type="button" className='px-4 block' onClick={() => setSelectedJob(jobs.blm)}>Black Mage</button></li>
            <li className='hover:bg-gray-200'>
              <button type="button" className='px-4 block' onClick={() => setSelectedJob(jobs.rdm)}>Red Mage</button></li>
          </ul>
        </div>
      </nav>
    </div>
    <hr />
  </header>
  )
}
