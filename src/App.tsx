// import { useState } from 'react'
import jobs from "./jobs"

function App() {

  console.log(jobs)

  const commentArray:string[] = ["Comment1", "Comment2", "Comment3"]
//   const [count, setCount] = useState(0)

//   let plus = () => {
//   setCount((prev) => prev+1)
// }

  return (
    <>
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
                <li className='hover:bg-cyan-100'>
                  <a href="" className='px-4 block hover:text-gray-500'>Warrior</a></li>
                <li className='hover:bg-cyan-100'>
                  <a href="" className='px-4 block hover:text-gray-500'>Thief</a></li>
                <li className='hover:bg-cyan-100'>
                  <a href="" className='px-4 block hover:text-gray-500'>Monk</a></li>
                <li className='hover:bg-cyan-100'>
                  <a href="" className='px-4 block hover:text-gray-500'>White Mage</a></li>
                <li className='hover:bg-cyan-100'>
                  <a href="" className='px-4 block hover:text-gray-500'>Black Mage</a></li>
                <li className='hover:bg-cyan-100'>
                  <a href="" className='px-4 block hover:text-gray-500'>Red Mage</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <hr />
      </header>

      <main className="flex justify-center pt-12 px-8">
        <div className="flex flex-col text-center pr-8">
          <h2 className="text-3xl">{jobs.war.name}</h2>
          <hr />
          <p>{jobs.war.description}</p>
          <div className="flex justify-center">
            <img src="/images/realWarrior.webp" alt="Warrior Job" className="w-3/4 h-auto p-2 bg-gray-300 rounded-md" />
          </div>
        </div>
        <div className="pl-8">
          <h3 className="text-2xl">2 Hour Ability: Chainspell</h3>
        </div>
      </main>

      <section className='w-full mt-20 relative'>
        <img src="/images/wallpaperB.jpg" alt="Final Fantasy XI Wallpaper" className='w-full h-auto' />
        <div className="absolute top-20 left-20">
          <p className="text-4xl">Released in 2002</p>
        </div>
      </section>

      <section className="flex justify-center mt-20">
        <div className="w-3/4 m-8">
          <h2 className="text-2xl text-center">{commentArray.length} Comments</h2>
          <hr />
          <p>Welcome to the comment section! Comments must be between 4-250 characters long. Drop a "Hello World" and thank you for stopping by.</p>
          <input type="text" placeholder="What do you think" className="px-2 py-1 w-full border-black rounded-md" />
          {commentArray.map((comment) => <p>{comment}</p>)}
        </div>
      </section>
    </>
  )
}

export default App
