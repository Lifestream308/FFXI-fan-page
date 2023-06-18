// import React from 'react'

// try to refactor so that it takes in a jobs.war or jobs.mnk and then everything else fills in correctly

export default function JobComponent({job}:any) {
  return (
    <main className="flex flex-col justify-center pt-12 px-[5%] sm:flex-row">
    <div className="flex flex-col text-center sm:pr-8 sm:w-1/2">
      <h2 className="text-3xl mb-7 mx-auto px-3 py-1 w-fit text-white bg-cyan-700 rounded-lg">{job.name}</h2>
      <hr />
      <p className="my-6 leading-7">{job.description}</p>
      <div className="flex self-center max-w-xs sm:w-full">
        <img src={"/images/" + job.image} alt="Image of FFXI Job" className="mb-8 w-full h-auto p-2 bg-gray-300 border border-black rounded-md" />
      </div>
    </div>
    <div className="sm:pl-8 sm:w-1/2">
      <h3 className="text-2xl mb-2 inline-block mr-2 sm:block md:inline-block">2 Hour Ability:</h3>
      <h3 className="text-2xl mb-4 px-3 py-1 w-fit text-white bg-amber-600 rounded-lg inline-block md:inline-block">{job.twoHourAbility}</h3>
      <p className="mt-4 leading-7">{job.twoHourDescription}</p>
      <h4 className="text-2xl mt-8 mb-4 px-3 py-1 w-fit text-white bg-violet-900 rounded-lg">{job.blurbTitle}</h4>
      {job.blurbDescription.split('\\n').map((line:string) => <p className="mb-2 leading-7" key={line}>{line}</p>)}
    </div>
  </main>
  )
}
