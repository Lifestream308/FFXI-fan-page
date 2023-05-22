// import { useState } from 'react'

function App() {

//   const [count, setCount] = useState(0)

//   let plus = () => {
//   setCount((prev) => prev+1)
// }

  return (
    <>
      <header className='flex px-24 justify-between items-center'>
        <div className='flex'>
          <img src="./images/icon1.jfif" alt="" className='inline-block h-8 self-end' />
          <h1 className='text-3xl'>Final Fantasy XI</h1>
        </div>
        <nav className='flex text-lg'>
          <a href="" className='p-4 hover:bg-gray-200 transition duration-300'>Project</a>
          <a href="" className='p-4 hover:bg-gray-200 transition duration-300'>History</a>
          <div className='nav__dropdown relative hover:bg-gray-200 transition duration-300'>
            <button type='button' className='p-4'>Jobs</button>
            <ul className='nav__dropdown-content absolute hidden w-max'>
              <li className='hover:bg-cyan-100'>
                <a href="" className='px-4 w-full hover:text-gray-500'>Warrior</a></li>
              <li className='hover:bg-cyan-100'>
                <a href="" className='px-4 w-full hover:text-gray-500'>Thief</a></li>
              <li className='hover:bg-cyan-100'>
                <a href="" className='px-4 w-full hover:text-gray-500'>Monk</a></li>
              <li className='hover:bg-cyan-100'>
                <a href="" className='px-4 w-full hover:text-gray-500'>White Mage</a></li>
              <li className='hover:bg-cyan-100'>
                <a href="" className='px-4 w-full hover:text-gray-500'>Black Mage</a></li>
              <li className='hover:bg-cyan-100'>
                <a href="" className='px-4 w-full hover:text-gray-500'>Red Mage</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <hr />

      <div className='w-full'>
        <img src="/images/wallpaperB.jpg" alt="Final Fantasy XI Wallpaper" className='w-full h-auto' />
      </div>
    </>
  )
}

export default App
