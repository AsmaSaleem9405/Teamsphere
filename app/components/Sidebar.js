'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r min-h-screen p-4">

      <button className="w-full bg-indigo-600 text-white p-3 rounded-lg">
        Start a Meeting for Free
      </button>

      <div className="mt-8 space-y-3">

        <Link href="/">
          <div className="p-3 hover:bg-gray-100 rounded">
            Home
          </div>
        </Link>

        <Link href="/meeting">
          <div className="p-3 hover:bg-gray-100 rounded">
            Meetings
          </div>
        </Link>

        <Link href="/contacts">
          <div className="p-3 hover:bg-gray-100 rounded">
            Contacts
          </div>
        </Link>

        <Link href="/chat">
          <div className="p-3 hover:bg-gray-100 rounded">
            Chat
          </div>
        </Link>

      </div>
    </div>
  )
}