// import React from 'react'

export default function RoundTable2() {
  return (
    <section>
    <div className="m-6 mb-24 overflow-hidden sm:rounded-lg">
        <div className="align-middle">
            <table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Product Name
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Category
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Price
                        </th>
                        <th scope="col" className="p-4">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    </section>
  )
}
