import React from 'react'

export default function sidebar() {
  return (
    <div>
          <aside className="md:col-span-1 bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-indigo-600 cursor-pointer">Dashboard</li>
            <li className="hover:text-indigo-600 cursor-pointer">Settings</li>
            <li className="hover:text-indigo-600 cursor-pointer">Profile</li>
          </ul>
        </aside>
      
    </div>
  )
}
