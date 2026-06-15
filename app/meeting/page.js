"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase/client";
import Sidebar from "@/app/components/Sidebar";
import MeetingSummary from "@/app/components/MeetingSummary";
export default function MeetingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [meetingLink, setMeetingLink] = useState("");

  const [form, setForm] = useState({
    title: "Team Meeting",
    meeting_type: "instant",
    privacy: "public",
    participants: "",
  });

  useEffect(() => {
    setMeetingLink(
      `${window.location.origin}/meeting/${crypto.randomUUID()}`
    );
  }, []);

  const createMeeting = async () => {
    const { error } = await supabase
      .from("meetings2")
      .insert([
        {
          title: form.title,
          meeting_type: form.meeting_type,
          privacy: form.privacy,
          meeting_link: meetingLink,
          participants: form.participants
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
      ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("Meeting Created Successfully");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(meetingLink);
    alert("Meeting Link Copied");
  };

  return (
    <div className="flex min-h-screen text-black bg-[#F7F8FC]">

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <main className="flex-1 p-4 lg:p-8">

        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mb-6 bg-white p-3 rounded-xl shadow"
        >
          ☰
        </button>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl p-6 shadow-sm">

              <h1 className="text-4xl font-bold">
                Start a Meeting for Free
              </h1>

              <p className="text-gray-500 mt-2">
                Create a new meeting and invite participants
              </p>

              {/* Meeting Title */}
              <div className="flex gap-4 mt-8">

                <div className="bg-indigo-50 p-3 rounded-xl h-fit">
                  <img
                    src="/icons/users (1).png"
                    alt=""
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex-1">

                  <label className="font-medium">
                    Meeting Title
                  </label>

                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    className="w-full mt-2 border rounded-xl p-3"
                  />

                </div>

              </div>

              {/* Meeting Type */}
              <div className="flex gap-4 mt-8">

                <div className="bg-indigo-50 p-3 rounded-xl h-fit">
                  <img
                    src="/icons/calendar (1).png"
                    alt=""
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex-1">

                  <label className="font-medium">
                    Meeting Type
                  </label>

                  <div className="grid md:grid-cols-2 gap-4 mt-3">

                    <button
  onClick={() =>
    setForm({
      ...form,
      meeting_type: "instant",
    })
  }
  className={`border rounded-2xl p-5 text-left w-full flex gap-3 items-start ${
    form.meeting_type === "instant"
      ? "border-indigo-600 bg-indigo-50"
      : ""
  }`}
>
  <img
    src="/icons/charge.png"
    alt="Instant"
    className="w-6 h-6 mt-1"
  />

  <div>
    <h3 className="font-semibold">Instant Meeting</h3>
    <p className="text-sm text-gray-500 mt-1">Start immediately</p>
  </div>
</button>
<button
  onClick={() =>
    setForm({
      ...form,
      meeting_type: "scheduled",
    })
  }
  className={`border rounded-2xl p-5 text-left w-full flex gap-3 items-start ${
    form.meeting_type === "scheduled"
      ? "border-indigo-600 bg-indigo-50"
      : ""
  }`}
>
  <img
    src="/icons/calendar.png"
    alt="Schedule"
    className="w-6 h-6 mt-1"
  />

  <div>
    <h3 className="font-semibold">Schedule for Later</h3>
    <p className="text-sm text-gray-500 mt-1">Plan ahead</p>
  </div>
</button>
                  </div>

                </div>

              </div>

              {/* Privacy */}
              <div className="flex gap-4 mt-8">

                <div className="bg-indigo-50 p-3 rounded-xl h-fit">
                  <img
                    src="/icons/padlock.png"
                    alt=""
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex-1">

                  <label className="font-medium">
                    Meeting Privacy
                  </label>

                  <div className="grid md:grid-cols-2 gap-4 mt-3">
<button
  onClick={() =>
    setForm({
      ...form,
      privacy: "public",
    })
  }
  className={`border rounded-2xl p-5 text-left w-64 flex gap-3 items-start transition ${
    form.privacy === "public"
      ? "border-indigo-600 bg-indigo-50"
      : ""
  }`}
>
  <img
    src="/icons/www.png"
    alt="Public"
    className="w-6 h-6 mt-1"
  />

  <div>
    <h3 className="font-semibold">Public Link</h3>
    <p className="text-sm text-gray-500 mt-1">
      Anyone with the link can join
    </p>
  </div>
</button>

<button
  onClick={() =>
    setForm({
      ...form,
      privacy: "private",
    })
  }
  className={`border rounded-2xl p-5 text-left w-64 flex gap-3 items-start transition ${
    form.privacy === "private"
      ? "border-indigo-600 bg-indigo-50"
      : ""
  }`}
>
  <img
    src="/icons/padlock (1).png"
    alt="Private"
    className="w-6 h-6 mt-1"
  />

  <div>
    <h3 className="font-semibold">Private Meeting</h3>
    <p className="text-sm text-gray-500 mt-1">
      Only invited people can join
    </p>
  </div>
</button>
                  </div>

                </div>

              </div>

              {/* Invite Participants */}
              <div className="flex gap-4 mt-8">

                <div className="bg-indigo-50 p-3 rounded-xl h-fit">
                  <img
                    src="/icons/group-chat.png"
                    alt=""
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex-1">

                  <label className="font-medium">
                    Invite Participants
                  </label>

                  <div className="flex mt-3">

                    <input
                      placeholder="Invite by email"
                      value={form.participants}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          participants: e.target.value,
                        })
                      }
                      className="flex-1 border p-3 rounded-l-xl"
                    />

                    <button className="border border-l-0 px-5 rounded-r-xl">
                      Add
                    </button>

                  </div>

                </div>

              </div>

              {/* Divider */}
              <div className="my-8 flex items-center">

                <div className="flex-1 h-px bg-gray-200"></div>

                <span className="px-4 text-sm text-gray-500">
                  or share meeting link
                </span>

                <div className="flex-1 h-px bg-gray-200"></div>

              </div>


              

              {/* Link Box */}
              <div className="bg-gray-50 border rounded-2xl p-2 flex justify-between items-center">

                <span className="truncate text-sm">
                  {meetingLink}
                </span>

                <button
  onClick={copyLink}
  className="bg-white border px-3 py-1 rounded-xl text-indigo-600 flex items-center gap-2"
>
  <img
    src="/icons/copy.png"
    alt="Copy"
    className="w-4 h-4"
  />

  Copy Link
</button>

              </div>

              {/* Bottom Buttons */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">

              <button
  onClick={createMeeting}
  className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
>
  <img src="/icons/video.png" alt="video icon" className="w-5 h-5" />
  Start Meeting Now
</button>

<button className="border py-4 rounded-2xl font-medium flex items-center justify-center gap-2">
  <img src="/icons/users.png" alt="invite icon" className="w-5 h-5" />
  Invite From Contacts
</button>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <MeetingSummary
  form={form}
  meetingLink={meetingLink}
/>

            


    </div>

      </main>

    </div>
  );
}