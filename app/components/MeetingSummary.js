"use client";

import Image from "next/image";

export default function MeetingSummary({
  form,
  meetingLink,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">

      <h2 className="text-2xl font-bold">
        Meeting Summary
      </h2>

      {/* Top Icon */}

      <div className="flex justify-center mt-10">

        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center">

          <Image
            src="/icons/calendar (1).png"
            width={42}
            height={42}
            alt="calendar"
          />

        </div>

      </div>

      {/* Title */}

      <div className="text-center mt-8">

        <h3 className="font-bold text-3xl">
          {form.title}
        </h3>

        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg mt-4">
  <Image
    src={
      form.meeting_type === "instant"
        ? "/icons/charge.png"
        : "/icons/calendar.png"
    }
    width={14}
    height={14}
    alt={
      form.meeting_type === "instant"
        ? "Instant Meeting"
        : "Scheduled Meeting"
    }
  />

  <span className="text-sm">
    {form.meeting_type === "instant"
      ? "Instant Meeting"
      : "Scheduled Meeting"}
  </span>
</div>

      </div>

      {/* Divider */}

      <div className="border-t mt-8 pt-8">

        {/* Privacy */}

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <Image
              src="/icons/insurance.png"
              width={18}
              height={18}
              alt=""
            />

            <span>Privacy</span>

          </div>

          <span>
            {form.privacy === "public"
              ? "Public Link"
              : "Private"}
          </span>

        </div>

        {/* Participants */}

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <Image
              src="/icons/users.png"
              width={18}
              height={18}
              alt=""
            />

            <span>Participants</span>

          </div>

          <span>
            {form.participants
              ? form.participants
                  .split(",")
                  .filter(Boolean).length
              : "Not added"}
          </span>

        </div>

        {/* Meeting Link */}

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <Image
              src="/icons/link.png"
              width={18}
              height={18}
              alt=""
            />

            <span>Meeting Link</span>

          </div>

          <span className="text-indigo-600 text-sm truncate max-w-[140px]">
            {meetingLink
              ? meetingLink.replace(
                  window.location.origin,
                  ""
                )
              : "Not Created"}
          </span>

        </div>

        {/* Created By */}

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <Image
              src="/icons/person.png"
              width={18}
              height={18}
              alt=""
            />

            <span>Created by</span>

          </div>

          <span>You</span>

        </div>

        {/* Date */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Image
              src="/icons/calendar.png"
              width={18}
              height={18}
              alt=""
            />

            <span>Date & Time</span>

          </div>

          <span>Started Now</span>

        </div>

      </div>

      {/* What's Next Box */}

      <div className="bg-[#F8F8FF] rounded-xl p-5 mt-8">

        <h4 className="font-semibold">
          What's next?
        </h4>

        <p className="text-sm text-gray-500 mt-3 leading-6">

          Click "Start Meeting Now" to begin
          immediately. You can invite people
          during or after the meeting. 🎉

        </p>

      </div>

    </div>
  );
}