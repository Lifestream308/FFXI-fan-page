// import React from 'react'

// try to refactor so that it takes in a jobs.war or jobs.mnk and then everything else fills in correctly

export default function JobComponent({job}:any) {
  return (
    <main className="flex flex-col justify-center pt-12 px-8 sm:flex-row">
    <div className="flex flex-col text-center pr-8 sm:w-1/2">
      <h2 className="text-3xl mb-3">{job.name}</h2>
      <hr />
      <p className="mt-6 mb-6">{job.description}</p>
      <div className="flex justify-center">
        <img src={"/images/" + job.image} alt="Warrior Job" className="mb-8 max-w-lg h-auto p-2 bg-gray-300 rounded-md" />
      </div>
    </div>
    <div className="pl-8 sm:w-1/2">
      <h3 className="text-2xl mb-4">2 Hour Ability: {job.twoHourAbility}</h3>
      <p>{job.twoHourDescription}</p>
      <h4 className="text-2xl mt-8 mb-4">{job.blurbTitle}</h4>
      {job.blurbDescription.split('\\n').map((line:string) => <p className="mb-2" key={line}>{line}</p>)}
    </div>
  </main>
  )
}
