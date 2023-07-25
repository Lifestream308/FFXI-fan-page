// import React from 'react'

export default function ForumComponent() {
  return (
    <section className="mt-8 mb-24 mx-auto max-w-5xl overflow-hidden rounded-lg">
        <div className="min-w-full">
            <table className='min-w-full text-left bg-slate-100'>
                <tbody>
                <tr className="border-t">
                    <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500'>TOPIC</th>
                    <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500 w-36 hidden sm:table-cell'>AUTHOR</th>
                    <th className='px-6 py-4 text-sm bg-blue-100 text-indigo-500 w-16'>POSTS</th>
                </tr>
                <tr>
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
                </tr>
                </tbody>
            </table>
        </div>
    </section>
  )
}
