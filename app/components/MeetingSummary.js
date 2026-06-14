'use client'

export default function MeetingSummary({
  data,
  link
}) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-semibold text-lg">
        Meeting Summary
      </h2>

      <div className="mt-6">

        <h3 className="text-xl font-bold">
          {data.title}
        </h3>

        <p className="mt-4">
          Privacy:
          {' '}
          {data.privacy}
        </p>

        <p>
          Type:
          {' '}
          {data.meeting_type}
        </p>

        <p className="mt-2 break-all">
          {link}
        </p>

      </div>
    </div>
  )
}