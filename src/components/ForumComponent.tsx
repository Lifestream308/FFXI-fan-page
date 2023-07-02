// import React from 'react'

export default function ForumComponent() {
  return (
    <section className="mt-8 mb-24 mx-8 overflow-hidden rounded-lg">
        <div className="min-w-full">
            <table className='min-w-full text-center bg-slate-200'>
                <tbody>
                <tr>
                    <th className='px-4 bg-blue-300 text-orange-500'>Topics</th>
                    <th className='px-4 bg-blue-300 text-orange-500 w-32 hidden sm:table-cell'>Author</th>
                    <th className='px-4 bg-blue-300 text-orange-500 w-16'>Posts</th>
                </tr>
                <tr>
                    <td className="px-4 text-left">First Topic</td>
                    <td className="px-4 hidden sm:table-cell">NameHere</td>
                    <td className="px-4">8</td>
                </tr>
                <tr>
                    <td className="px-4 text-left">Second Topic</td>
                    <td className="px-4 hidden sm:table-cell">Anonymous</td>
                    <td className="px-4">25</td>
                </tr>
                <tr>
                    <td className="px-4 text-left">Third Topic</td>
                    <td className="px-4 hidden sm:table-cell">Anon</td>
                    <td className="px-4">5</td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
  )
}
