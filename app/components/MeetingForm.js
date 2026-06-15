'use client'

import { useState } from 'react'

export default function MeetingForm({
  onChange
}) {

  const [form, setForm] = useState({
    title: 'Team Meeting',
    meeting_type: 'instant',
    privacy: 'public',
    participants: ''
  })

  const updateForm = (key, value) => {
    const updated = {
      ...form,
      [key]: value
    }

    setForm(updated)
    onChange(updated)
  }

  return (
    <div className="bg-white p-6  text-black rounded-xl shadow">

      <h2 className="font-semibold text-black text-lg mb-6">
        Start a Meeting for Free
      </h2>

      <label>
        Meeting Title
      </label>

      <input
        className="w-full border p-3 rounded mt-2"
        value={form.title}
        onChange={(e)=>
          updateForm('title', e.target.value)
        }
      />

      <div className="mt-6 text-black">

        <label>Meeting Type</label>

        <div className="flex gap-4 mt-2">

          <button
            onClick={()=>
              updateForm(
                'meeting_type',
                'instant'
              )
            }
            className={`border p-4 rounded flex-1 ${
              form.meeting_type === 'instant'
                ? 'border-indigo-500'
                : ''
            }`}
          >
            Instant Meeting
          </button>

          <button
            onClick={()=>
              updateForm(
                'meeting_type',
                'scheduled'
              )
            }
            className={`border p-4 rounded flex-1 ${
              form.meeting_type === 'scheduled'
                ? 'border-indigo-500'
                : ''
            }`}
          >
            Schedule for Later
          </button>

        </div>
      </div>

      <div className="mt-6">

        <label>Meeting Privacy</label>

        <div className="flex gap-4 mt-2">

          <button
            onClick={()=>
              updateForm(
                'privacy',
                'public'
              )
            }
            className={`border p-4 rounded flex-1 ${
              form.privacy === 'public'
                ? 'border-indigo-500'
                : ''
            }`}
          >
            Public Link
          </button>

          <button
            onClick={()=>
              updateForm(
                'privacy',
                'private'
              )
            }
            className={`border p-4 rounded flex-1 ${
              form.privacy === 'private'
                ? 'border-indigo-500'
                : ''
            }`}
          >
            Private
          </button>

        </div>
      </div>

      <div className="mt-6">

        <label>
          Invite Participants
        </label>

        <input
          className="w-full border p-3 rounded mt-2"
          placeholder="email1,email2"
          onChange={(e)=>
            updateForm(
              'participants',
              e.target.value
            )
          }
        />

      </div>

    </div>
  )
}