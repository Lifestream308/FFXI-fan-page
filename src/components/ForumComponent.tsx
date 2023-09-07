// import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ForumComponent({forumTopics, getForumTopics, user, logout}: any) {

    const [forumPage, setForumPage] = useState<number>(1)
  
    const commentsPerPage :number = 5
    const divisibleComments :number = Math.ceil((forumTopics.length / commentsPerPage))
    const pagination :number[] = [...Array(divisibleComments).keys()]
  
    const prevPage = () => {
      if (forumPage <= 1) return
      setForumPage(prev => prev-1)
    }
    const nextPage = () => {
      if (forumPage >= divisibleComments) return
      setForumPage(prev => prev+1)
    }

    useEffect(() => {
        getForumTopics()
    }, [])

  return (
    <div className="mx-1 mb-16">
    <div className="mt-8 mx-auto max-w-5xl">
        { user?.displayName && <p className="text-2xl text-center">Welcome {user.displayName}</p>}
        { !user &&
            <p className="mx-auto my-2 px-2 max-w-xl text-2xl text-center">Welcome to the forum! Submit topics anonymously or sign in to submit topics under your username. Click any topic to view the discussion.</p>
        }
        <div className="flex justify-between">
            <Link to={'/forum/NewTopic'} className="m-4 p-2 text-white bg-green-700 rounded-md">New Topic <span className="py-1"><i className="bi bi-plus-lg"></i></span></Link>
            { !user &&
            <Link to={'/SignIn'} className="m-4 p-2 text-white bg-blue-800 rounded-md">Sign In <span className="py-1"><i className="bi bi-person-fill"></i></span></Link>
            }
            { user && 
            <button onClick={logout} className="m-4 px-4 py-2 text-white bg-orange-600 rounded-md" >Logout <i className="bi bi-person-fill-slash"></i></button>
            }
        </div>
        <section className="mt-4 mb-16 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-xl">
            <div className="min-w-full">
                <table className='min-w-full text-left bg-slate-100'>
                    <tbody>
                    <tr className="border-t">
                        <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500'>TOPIC</th>
                        <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500 w-36 hidden sm:table-cell'>AUTHOR</th>
                        <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500 w-16'>POSTS</th>
                    </tr>
                    
                    {forumTopics.slice(commentsPerPage*(forumPage-1), commentsPerPage*forumPage).map((topic:any) => {
                        return (
                            <tr className="border-t" key={topic.id}>
                                <td className="px-6 py-4 text-gray-700 text-left">
                                    <Link to={`/forum/${topic.id}`} className="flex flex-nowrap gap-1">
                                        <span className="text-gray-500 no-underline"><i className="bi bi-journal-text"></i></span>
                                        <span className="text-blue-800 underline">{topic.title}</span>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-gray-700 hidden sm:table-cell">{topic.author}</td>
                                <td className="px-6 py-4 text-gray-700 text-center">{topic.numOfComments}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </section>
    </div>
    <div className='mt-8 flex flex-wrap justify-center'>
        <button onClick={() => prevPage()} className='m-1 px-3 py-2 text-xs text-gray-600 bg-stone-50 border border-gray-100 rounded-md shadow-md shadow-gray-500'><i className="bi bi-caret-left-fill"></i></button>
        
        {pagination.map((num) => {
          return (
            <button key={num} onClick={() => setForumPage(num+1)} className={'m-1 px-4 py-2 text-gray-600 bg-stone-50 border-2 rounded-md shadow-md shadow-gray-500' + (num+1 == forumPage ? ' border-blue-700' : ' border-gray-100')}>{num+1}</button>
          )
        })}
        <button onClick={() => nextPage()} className='m-1 px-3 py-2 text-xs text-gray-600 bg-stone-50 border border-gray-100 rounded-md shadow-md shadow-gray-500'><i className="bi bi-caret-right-fill"></i></button>
      </div>
    </div>
  )
}
