// import React from 'react'
import { Outlet } from "react-router-dom"
import CommentComponent from "./CommentComponent"

export default function CommentLayout({ firebaseItemsDB, messageRef, isSortedByRecent, setIsSortedByRecent, handleCommentSubmit}:any) {
  return (
    <>
    <Outlet />
    <CommentComponent firebaseItemsDB={firebaseItemsDB} handleCommentSubmit={handleCommentSubmit} isSortedByRecent={isSortedByRecent} messageRef={messageRef} setIsSortedByRecent={setIsSortedByRecent} />
    </>
  )
}
