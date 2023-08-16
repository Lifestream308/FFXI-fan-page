// import React from 'react'
import { useDispatch } from "react-redux"
import { modalShowingFalse } from "../redux/slices/isModalShowingSlice"

export default function ModalComponent({modalMessage}:any) {

  const dispatch = useDispatch()

  return (
    <>
    <div className='fixed flex justify-center z-20 w-full h-full bg-gray-400 bg-opacity-70'>
        <div className='p-4 w-fit h-fit mt-32 text-center rounded-lg text-black bg-white shadow-2xl'>
            <p className='mb-4 text-3xl'>{modalMessage}</p>
            <hr />
            <button className='mt-4 px-2 py-1 text-2xl rounded-lg bg-red-600 text-white' onClick={() => dispatch(modalShowingFalse())}>Close</button>
        </div>
    </div>
    </>
  )
}
