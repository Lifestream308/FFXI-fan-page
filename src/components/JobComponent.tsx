import { useEffect } from 'react'
import jobsArray from "../jobsArray"

export default function JobComponent({ jobIndex, setJobIndex }:any) {

  let job = jobsArray[jobIndex]

  const handleJobChange = {
    prev: () => {setJobIndex((prev:number) => prev > 0 ? prev-1 : jobsArray.length-1)},
    next: () => {setJobIndex((prev:number) => prev < jobsArray.length-1 ? prev+1 : 0)},
  }

  useEffect(() => {
    let handler = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") {
        handleJobChange.prev()
      }
      if (e.code === "ArrowRight") {
        handleJobChange.next()
      }
    }
    document.addEventListener("keydown", handler);
    
    return() =>{
      document.removeEventListener("keydown", handler);
    }
  }, []);

  return (
    <main className="flex flex-col justify-center pt-8 px-[5%] gap-12">

      <div className="flex flex-col gap-12 justify-center items-center h-[30rem] w-full bg-fixed bg-center bg-cover bg-no-repeat custom-img sm:bg-contain">
        <h1 className="hidden text-5xl text-white underline sm:flex">Final Fantasy XI Online</h1>
        <h2 className="text-4xl text-neutral-300 sm:text-5xl">Discover Vana'diel</h2>
      </div>

      <div className="flex flex-col gap-6 text-center">
        <h2 className="text-4xl text-green-800">Standard Jobs</h2>
        <p className="text-lg underline underline-offset-2">When you first create a character you must choose one of the six starting jobs below.</p>
      </div>
      <div className="flex self-center items-center justify-evenly w-4/5 max-w-md">
        <div>
          <button onClick={() => handleJobChange.prev()} className="px-4 py-2 text-white rounded-md bg-stone-500 hover:opacity-90">Prev</button>
          {/* <img src="/images/blackmage1.webp" alt="" className="w-12 rounded-full" /> */}
        </div>
        <small>{jobIndex+1} of {jobsArray.length}</small>
        <button onClick={() => handleJobChange.next()} className="px-4 py-2 text-white rounded-md bg-stone-500 hover:opacity-90">Next</button>
      </div>
      <div className="flex flex-col justify-center sm:flex-row">
        <div className="flex flex-col text-center sm:pr-8 sm:w-1/2">
          <h2 className="text-3xl mb-7 mx-auto px-3 py-1 w-fit text-white bg-cyan-700 rounded-lg">{job.name}</h2>
          <hr />
          <p className="my-6 leading-7">{job.description}</p>
          <div className="flex self-center w-4/5 max-w-xs sm:w-full">
            <img src={"/images/" + job.image} alt="Image of FFXI Job" className="mb-8 w-full h-auto p-2 bg-gray-300 border border-black rounded-md" />
          </div>
        </div>
        <div className="px-2 sm:pl-8 sm:w-1/2">
          <h3 className="text-2xl mb-2 inline-block mr-2 sm:block md:inline-block">2 Hour Ability:</h3>
          <h3 className="text-2xl mb-4 px-3 py-1 w-fit text-white bg-amber-600 rounded-lg inline-block md:inline-block">{job.twoHourAbility}</h3>
          <p className="mt-4 leading-7">{job.twoHourDescription}</p>
          <h4 className="text-2xl mt-8 mb-4 px-3 py-1 w-fit text-white bg-violet-900 rounded-lg">{job.blurbTitle}</h4>
          {job.blurbDescription.split('\\n').map((line:string) => <p className="mb-2 leading-7" key={line}>{line}</p>)}
        </div>
      </div>
    </main>
  )
}
