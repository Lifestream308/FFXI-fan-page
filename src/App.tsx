import { useState, useEffect } from 'react'
import jobs from "./jobs"
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";


// don't forget to install firebase for other laptop. Use npm install so that it covers dotENV as well

function App() {

  // console.log(jobs)
  const commentArray:string[] = ["Comment1", "Comment2", "Comment3"]

  const [firebaseItemsDB, setFirebaseItemsDB] = useState([])
  const commentsCollectionRef = collection(db, "commentsCollection")

  const getComments = async () => {
    const data = await getDocs(commentsCollectionRef);
    let firebaseArray:any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setFirebaseItemsDB(firebaseArray);
    console.log(firebaseArray)
  }

  useEffect(() => {
    getComments()
  }, [])


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

      <main className="flex flex-col justify-center pt-12 px-8 sm:flex-row">
        <div className="flex flex-col text-center pr-8 sm:w-1/2">
          <h2 className="text-3xl mb-3">{jobs.war.name}</h2>
          <hr />
          <p className="mt-6 mb-6">{jobs.war.description}</p>
          <div className="flex justify-center">
            <img src="/images/realWarrior.webp" alt="Warrior Job" className="mb-8 max-w-lg h-auto p-2 bg-gray-300 rounded-md" />
          </div>
        </div>
        <div className="pl-8 sm:w-1/2">
          <h3 className="text-2xl mb-4">2 Hour Ability: {jobs.war.twoHourAbility}</h3>
          <p>{jobs.war.twoHourDescription}</p>
          <h4 className="text-2xl mt-8 mb-4">{jobs.war.blurbTitle}</h4>
          <p>{jobs.war.blurbDescription}</p>
        </div>
      </main>

      <section className='w-full mt-20 relative'>
        <img src="/images/wallpaperB.jpg" alt="Final Fantasy XI Wallpaper" className='w-full h-auto' />
        <div className="absolute top-[15%] left-[12%] p-1 rounded-lg bg-slate-50 bg-opacity-50">
          <p className="text-4xl">Released in 2002</p>
          <small>One of the longest running MMO's to date</small>
        </div>
      </section>

      <section className="flex justify-center mt-20">
        <div className="w-3/4 m-8">
          <h2 className="text-2xl text-center mb-8">{commentArray.length} Comments</h2>
          <hr />
          <p className="my-8">Welcome to the comment section! Comments must be between 4-250 characters long. Drop a "Hello World" and thank you for stopping by.</p>
          <input type="text" placeholder="What do you think?" className="px-2 py-1 mb-8 w-full bg-slate-200 border-black rounded-md" />
          {commentArray.map((comment) => <p className="mb-4">{comment}</p>)}
        </div>
      </section>
    </>
  )
}

export default App
