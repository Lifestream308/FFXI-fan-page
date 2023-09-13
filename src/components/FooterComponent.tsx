// import React from 'react'
import { Link } from 'react-router-dom'
// import HamburgerComponent from './HamburgerComponent'

export default function FooterComponent() {
  return (
    <div className="flex flex-col gap-10 my-8 mx-4">
        <div className="flex gap-8 text-4xl justify-center">
            <a href='' target='_blank' className='text-blue-500'><i className="bi bi-linkedin"></i></a>
            <a href='https://github.com/Lifestream308/FFXI-fan-page' target='_blank'><i className="bi bi-github"></i></a>
        </div>
        <nav className='mx-auto p-2 flex justify-center text-lg w-4/5 max-w-3xl min-w-fit border-4 border-black rounded-lg'>
          <Link to="/" onClick={() => {window.scrollTo(0,0)}} className='p-3 sm:px-8 hover:text-gray-500 transition duration-200'>Home</Link>
          <Link to="/about" onClick={() => {window.scrollTo(0,0)}} className='p-3 sm:px-8 hover:text-gray-500 transition duration-200'>About</Link>
          <Link to="/forum" onClick={() => {window.scrollTo(0,0)}} className='p-3 sm:px-8 hover:text-gray-500 transition duration-200'>Forum</Link>
          <Link to="/" className='p-3 sm:px-8 hover:text-gray-500 transition duration-200'>Portfolio</Link>
        </nav>
        <div className='flex flex-col gap-5 items-center'>
            <p className='text-center max-w-2xl text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nesciunt illum accusamus suscipit molestiae, dolorum consectetur ipsam minima mollitia quo ut, commodi, reprehenderit aliquam nobis minus amet quis! Alias sequi commodi vel distinctio officiis.</p>
            <p className='text-gray-700 underline'>2023 John Doe</p>
        </div>
        {/* <HamburgerComponent /> */}
    </div>
  )
}
