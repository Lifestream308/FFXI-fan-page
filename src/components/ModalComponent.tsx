// import React from 'react'

export default function ModalComponent({modalMessage, setIsModalShowing}:any) {
  return (
    <>
    <div className='fixed flex justify-center z-20 w-full h-full bg-gray-400 bg-opacity-70'>
        <div className='p-4 w-fit h-fit mt-32 text-center rounded-lg text-black bg-white shadow-2xl'>
            <p className='mb-4 text-3xl'>{modalMessage}</p>
            <hr />
            <button className='mt-4 px-2 py-1 text-2xl rounded-lg bg-red-600 text-white' onClick={()=>setIsModalShowing(false)}>Close</button>
        </div>
    </div>
    </>
  )
}
