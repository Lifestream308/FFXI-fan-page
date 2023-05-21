import { useState } from 'react'

function App() {

  const [count, setCount] = useState(0)

  let plus = () => {
  setCount((prev) => prev+1)
}

  return (
    <>
      <header className='flex justify-around'>
        <h1>Final Fantasy XI</h1>
        <nav className='flex items-center'>
          <a href="" className='p-4'>Project</a>
          <a href="" className='p-4'>History</a>
          <div className='relative'>
            <button type='button' className='p-4'>Jobs</button>
            <ul className='absolute min-w-max'>
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


      <h1 className='text-gray-400'>Final Fantasy XI</h1>

      <p>{count}</p>
      <button onClick={plus}>Increase</button>
    </>
  )
}

export default App
