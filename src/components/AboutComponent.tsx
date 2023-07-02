// import React from 'react'

export default function AboutComponent() {
  return (
    <>
      <div className="mt-6 px-6">
        <h2 className="text-3xl underline">Website</h2>
        <p className="mt-3 leading-8">This site was created using React, Typescript, Tailwind, and Firebase. This project also makes use of environment variables, react-router-dom, and is hosted on Netlify. After nearly 100 commits you can see the code for yourself on 
        <a href="https://github.com/Lifestream308/FFXI-fan-page/tree/main" target="_blank"> Github.</a></p>
      </div>
      <div className="mt-10 px-6">
        <h2 className="text-3xl underline">Final Fantasy XI</h2>
        <p className="mt-3 leading-8">This Final Fantasy was the first MMO in the series and goes back over 20 years! It has been succeeded by Final Fantasy XIV, but FFXI is still my personal favorite. Whenever I hear the music from FFXI I'm immediately filled with nostalgia.</p>
      </div>
      <section id="about" className='w-full mt-4 relative'>
          <img src="/images/wallpaperB.jpg" alt="Final Fantasy XI Wallpaper" className='w-full h-auto' />
          <div className="absolute top-[15%] left-[12%] p-1 rounded-lg bg-slate-50 bg-opacity-40">
              <p className="text-4xl">Released in 2002</p>
              <small>One of the longest running MMO's to date...</small>

              <p className="mt-6">Enter the world of Vanadiel and team up with others if you want to survive</p>
          </div>
      </section>
    </>
  )
}
