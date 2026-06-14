'use client'

import { useState } from 'react'
import Sidebar from '@/app/components/Sidebar'
import MeetingForm from '@/app/components/MeetingForm'
import MeetingSummary from '@/app/components/MeetingSummary'
import { supabase } from '@/app/lib/supabase/client'

export default function MeetingPage() {

  const [form, setForm] = useState({
    title: 'Team Meeting',
    meeting_type: 'instant',
    privacy: 'public'
  })

  const [link, setLink] = useState('')

  const createMeeting = async () => {

    const meetingLink =
      `${window.location.origin}/meeting/` +
      crypto.randomUUID()

    const { error } =
      await supabase
        .from('meetings2')
        .insert([
          {
            title: form.title,
            meeting_type: form.meeting_type,
            privacy: form.privacy,
            meeting_link: meetingLink,
            participants:
              form.participants?.split(',')
          }
        ])

    if (error) {
      alert(error.message)
      return
    }

    setLink(meetingLink)

    alert('Meeting Created')
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-2">

            <MeetingForm
              onChange={setForm}
            />

            <button
              onClick={createMeeting}
              className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-lg"
            >
              Start Meeting Now
            </button>

          </div>

          <MeetingSummary
            data={form}
            link={link}
          />

        </div>

      </div>

    </div>
  )
}