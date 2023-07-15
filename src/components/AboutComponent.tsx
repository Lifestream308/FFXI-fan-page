// import React from 'react'

export default function AboutComponent() {
  return (
    <>
      <div className="mt-6 px-6 sm:px-[5%] max-w-5xl">
        <div className="">
          <h2 className="mb-3 text-4xl font-bold">About Website</h2>
          <p className="leading-8 text-gray-700">This site was created using React, Typescript, Tailwind, and Firebase. This project also makes use of environment variables, react-router-dom, and is hosted on Netlify. After more than 100 commits you can see the code for yourself on <a href="https://github.com/Lifestream308/FFXI-fan-page/tree/main" target="_blank" className="text-blue-700 underline">Github</a>. The ability descriptions come from the official Final Fantasy XI Strategy Guide.</p>
          <img src="/images/strategyGuide.jfif" alt="Picture of FFXI Strategy Guide" className="mt-4 h-auto w-40" />
        </div>
        <div className="mt-10">
          <h2 className="mb-3 text-4xl font-bold">About Final Fantasy XI</h2>
          <p className="leading-8 text-gray-700">This Final Fantasy was the first MMO in the series and goes back over 20 years! It has been succeeded by Final Fantasy XIV, but FFXI is still my personal favorite. Whenever I hear the music from FFXI I'm immediately filled with nostalgia. The combat in FFXI is much slower than modern MMO's, but I highly prefer it to spamming ability rotations and looking at ground indicators.</p>
          <img src="/images/group1.webp" alt="Group photo of all job classes" className="mt-4 h-auto w-11/12 max-w-xl" />
        </div>
      </div>
      <section id="about" className='w-full mt-4 relative'>
          <img src="/images/wallpaperB.jpg" alt="Final Fantasy XI Wallpaper" className='w-full h-auto' />
          <div className="absolute top-[15%] left-[12%] p-1 rounded-lg bg-slate-50 bg-opacity-40">
              <p className="text-4xl text-gray-800">Released in 2002</p>
              <small className="text-gray-800">One of the longest running MMO's to date...</small>

              <p className="mt-6 text-gray-800">Enter the world of Vanadiel and team up with others if you want to survive</p>
          </div>
      </section>
    </>
  )
}
