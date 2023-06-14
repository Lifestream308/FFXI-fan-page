// import React from 'react'

export default function ModalComponent({modalMessage, setShowModal}:any) {
  return (
    <>
    <div className='fixed flex justify-center z-10 w-full h-full bg-gray-400 bg-opacity-50'>
        <div className='p-4 w-fit h-fit mt-12 text-center rounded-lg text-black bg-white shadow-2xl'>
            <p className='mb-8 text-5xl'>{modalMessage}</p>
            <button className='p-2 text-2xl rounded-lg bg-green-700 text-white' onClick={()=>setShowModal(false)}>Close</button>
        </div>
    </div>
    </>
  )
}
