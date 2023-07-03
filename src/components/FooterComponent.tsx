// import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterComponent() {
  return (
    <div className="flex flex-col gap-6 my-8 mx-4">
        <div className="flex gap-8 justify-center">
            <p>LinkedIn</p>
            <p>Github</p>
        </div>
        <nav className='mb-4 mx-auto p-2 flex justify-center text-lg w-4/5 max-w-3xl min-w-fit border-4 border-black rounded-lg'>
          <Link to="/" className='p-3 sm:px-8 hover:text-gray-500 transition duration-200'>Home</Link>
          <Link to="/about" className='p-3 sm:px-8 hover:text-gray-500 transition duration-200'>About</Link>
          <Link to="/forum" className='p-3 sm:px-8 hover:text-gray-500 transition duration-200'>Forum</Link>
          <Link to="/" className='p-3 sm:px-8 hover:text-gray-500 transition duration-200'>Portfolio</Link>
        </nav>
        <div className='flex flex-col gap-4 items-center'>
            <p className='text-center max-w-2xl text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nesciunt illum accusamus suscipit molestiae, dolorum consectetur ipsam minima mollitia quo ut, commodi, reprehenderit aliquam nobis minus amet quis! Alias sequi commodi vel distinctio officiis.</p>
            <p className='text-gray-700 underline'>2023 John Doe</p>
        </div>
    </div>
  )
}
