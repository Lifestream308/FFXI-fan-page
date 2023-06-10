// import React from 'react'

export default function TableComponent() {
  return (
    <section className="mb-24 mx-8 overflow-hidden rounded-lg">
        <div className="min-w-full">
            <table className='min-w-full text-center bg-blue-600'>
                <tr>
                    <th className='px-4 bg-blue-300 text-orange-600'>Topics</th>
                    <th className='px-4 bg-blue-300 text-orange-600 w-32'>Author</th>
                    <th className='px-4 bg-blue-300 text-orange-600 w-16'>Posts</th>
                </tr>
                <tr>
                    <td className="px-4">First Topic</td>
                    <td className="px-4">NameHere</td>
                    <td className="px-4">8</td>
                </tr>
                <tr>
                    <td className="px-4">Second Topic</td>
                    <td className="px-4">Anonymous</td>
                    <td className="px-4">25</td>
                </tr>
            </table>
        </div>
    </section>
  )
}
