// import React from 'react'

export default function BGSection() {
  return (
    <section id="about" className='w-full mt-10 relative'>
        <img src="/images/wallpaperB.jpg" alt="Final Fantasy XI Wallpaper" className='w-full h-auto' />
        <div className="absolute top-[15%] left-[12%] p-1 rounded-lg bg-slate-50 bg-opacity-40">
            <p className="text-4xl">Released in 2002</p>
            <small>One of the longest running MMO's to date...</small>

            <p className="mt-6">Enter the world of Vanadiel and team up with others if you want to survive</p>
        </div>
    </section>
  )
}
