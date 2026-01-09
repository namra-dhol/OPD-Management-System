import React from 'react'
import Link from 'next/link'

export default function navbar() {
  return (
    <div>
      <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">LOGO HERE</div>

        <nav className="space-x-6 font-medium text-gray-700">
          {/* <Link href="/" className="hover:text-indigo-600">Home</Link>
          <Link href="/contact" replace className="hover:text-indigo-600">Contact</Link>
          <Link href="/about" className="hover:text-indigo-600">About</Link>
          <Link href="/demo" className="hover:text-indigo-600"> Demo </Link> */}
        </nav>
      </header>
    </div>
  )
}
