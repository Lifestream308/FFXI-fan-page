// import React from 'react'
import { Outlet } from "react-router-dom"
import CommentComponent from "./CommentComponent"

export default function CommentLayout({ anonymousComments, messageRef, isSortedByRecent, setIsSortedByRecent, handleCommentSubmit}:any) {
  return (
    <>
    <Outlet />
    <CommentComponent anonymousComments={anonymousComments} handleCommentSubmit={handleCommentSubmit} isSortedByRecent={isSortedByRecent} messageRef={messageRef} setIsSortedByRecent={setIsSortedByRecent} />
    </>
  )
}
