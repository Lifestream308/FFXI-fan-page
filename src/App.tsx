// import { useState } from 'react'
import jobs from "./jobs"
import Header from "./components/Header"
import BGSection from "./components/BGSection"

function App() {

  console.log(jobs)

  const commentArray:string[] = ["Comment1", "Comment2", "Comment3"]
//   const [count, setCount] = useState(0)

//   let plus = () => {
//   setCount((prev) => prev+1)
// }

  return (
    <>
      <Header />

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
          {jobs.war.blurbDescription.split('\\n').map((line) => <p className="mb-2">{line}</p>)}
        </div>
      </main>

      <BGSection />

      <section className="flex justify-center mt-6">
        <div className="w-3/4 m-8">
          <h2 className="text-2xl text-center mb-6">{commentArray.length} Comments</h2>
          <hr />
          <p className="my-6">Welcome to the comment section! Comments must be between 4-250 characters long. Drop a "Hello World" and thank you for stopping by.</p>
          <input type="text" placeholder="What do you think?" className="px-2 py-1 w-full bg-slate-200 border-black rounded-md" />
          {commentArray.map((comment) => <p className="mt-6">{comment}</p>)}
        </div>
      </section>
    </>
  )
}

export default App
