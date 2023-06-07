// import React from 'react'

export default function TableComponent() {
  return (
    <section className="flex justify-center">
        <table className='m-8 w-4/5 text-center border-collapse'>
            <tr>
                <th className='px-4 bg-blue-300 text-orange-600 border border-orange-400'>Topics</th>
                <th className='px-4 bg-blue-300 text-orange-600 border border-orange-400'>Author</th>
                <th className='px-4 bg-blue-300 text-orange-600 border border-orange-400'>Posts</th>
            </tr>
            <tr>
                <td className="px-4 border border-orange-400">First Topic</td>
                <td className="px-4 border border-orange-400">NameHere</td>
                <td className="px-4 border border-orange-400">8</td>
            </tr>
            <tr>
                <td className="px-4 border border-orange-400">Second Topic</td>
                <td className="px-4 border border-orange-400">Anonymous</td>
                <td className="px-4 border border-orange-400">25</td>
            </tr>
        </table>
    </section>
  )
}
