// import React from 'react'
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ForumComponent({handleTopicSubmit, topicTitleRef, topicContentRef, forumTopics, getForumTopics}: any) {

    useEffect(() => {
        getForumTopics()
    }, [])

  return (
    <>
    <section className="mt-8 mb-16 mx-auto max-w-5xl overflow-hidden rounded-lg">
        <div className="min-w-full">
            <table className='min-w-full text-left bg-slate-100'>
                <tbody>
                <tr className="border-t">
                    <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500'>TOPIC</th>
                    <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500 w-36 hidden sm:table-cell'>AUTHOR</th>
                    <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500 w-16'>POSTS</th>
                </tr>
                {/* <tr>
                    <td className="px-6 py-4 text-gray-700 text-left">First Topic</td>
                    <td className="px-6 py-4 text-gray-700 hidden sm:table-cell">NameHere</td>
                    <td className="px-6 py-4 text-gray-700 text-center">8</td>
                </tr>
                <tr className="border-t">
                    <td className="px-6 py-4 text-gray-700 text-left">Second Topic</td>
                    <td className="px-6 py-4 text-gray-700 hidden sm:table-cell">Anonymous</td>
                    <td className="px-6 py-4 text-gray-700 text-center">25</td>
                </tr>
                <tr className="border-t">
                    <td className="px-6 py-4 text-gray-700 text-left">Third Topic</td>
                    <td className="px-6 py-4 text-gray-700 hidden sm:table-cell">Anon</td>
                    <td className="px-6 py-4 text-gray-700 text-center">5</td>
                </tr> */}
                
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

    <div className="mb-12 text-center">
        <input type="text" placeholder="Title" ref={topicTitleRef} className="m-4 border border-black" />
        <br />
        <input type="text" placeholder="Content" ref={topicContentRef} className="m-4 border border-black" />
        <br />
        <button type="button" onClick={()=> handleTopicSubmit()} className="m-4 p-2 text-white bg-green-700 rounded-md">Submit Topic</button>
    </div>
    </>
  )
}
