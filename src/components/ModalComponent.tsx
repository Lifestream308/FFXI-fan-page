// import React from 'react'

export default function ModalComponent({modalMessage, setShowModal}:any) {
  return (
    <>
    <div className='fixed flex justify-center z-10 w-full h-full bg-gray-400 bg-opacity-60'>
        <div className='p-4 w-fit h-fit mt-12 text-center rounded-lg text-black bg-white shadow-2xl'>
            <p className='mb-4 text-3xl'>{modalMessage}</p>
            <hr />
            <button className='mt-4 px-2 py-1 text-2xl rounded-lg bg-red-600 text-white' onClick={()=>setShowModal(false)}>Close</button>
        </div>
    </div>
    </>
  )
}
