// import React from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ForumComponent({forumTopics, getForumTopics}: any) {

    useEffect(() => {
        getForumTopics()
    }, [])

  return (
    <div className="mt-8 mx-auto max-w-5xl">
        <div className="flex justify-between">
            <Link to={'/forum/NewTopic'} className="m-4 p-2 text-white bg-green-700 rounded-md">New Topic <span className="py-1"><i className="bi bi-plus-lg"></i></span></Link>
            <Link to={'/SignIn'} className="m-4 p-2 text-white bg-blue-800 rounded-md">Sign In <span className="py-1"><i className="bi bi-plus-lg"></i></span></Link>
        </div>
        <section className="mt-4 mb-16 mx-auto max-w-5xl overflow-hidden rounded-lg">
            <div className="min-w-full">
                <table className='min-w-full text-left bg-slate-100'>
                    <tbody>
                    <tr className="border-t">
                        <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500'>TOPIC</th>
                        <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500 w-36 hidden sm:table-cell'>AUTHOR</th>
                        <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500 w-16'>POSTS</th>
                    </tr>
                    
                    {forumTopics.map((topic:any) => {
                        return (
                            <tr className="border-t" key={topic.id}>
                                <td className="px-6 py-4 text-gray-700 text-left">
                                    <Link to={`/forum/${topic.id}`} className="text-blue-800 underline">{topic.title}</Link>
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

        {/* <div className="mb-12 text-center">
            <input type="text" placeholder="Title" ref={topicTitleRef} className="m-4 border border-black" />
            <br />
            <input type="text" placeholder="Content" ref={topicContentRef} className="m-4 border border-black" />
            <br />
            <button type="button" onClick={()=> handleTopicSubmit()} className="m-4 p-2 text-white bg-green-700 rounded-md">Submit Topic</button>
        </div> */}
    </div>
  )
}
