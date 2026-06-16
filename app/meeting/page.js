"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase/client";
import Sidebar from "@/app/components/Sidebar";

export default function MeetingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [previewMeetingLink, setPreviewMeetingLink] = useState("");

  useEffect(() => {
    const tempId = crypto.randomUUID();

    setPreviewMeetingLink(
      `${window.location.origin}/meeting/${tempId}`
    );
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      previewMeetingLink
    );

    alert("Meeting link copied");
  };

  const [form, setForm] = useState({
    title: "",
    meeting_type: "instant",
    privacy: "public",
    scheduled_date: "",
    scheduled_time: "",
  });

  const addParticipant = () => {
    const email = participantInput.trim();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Enter valid email");
      return;
    }

    if (participants.includes(email)) {
      alert("Already added");
      return;
    }

    setParticipants([
      ...participants,
      email,
    ]);

    setParticipantInput("");
  };

  const removeParticipant = (email) => {
    setParticipants(
      participants.filter(
        (item) => item !== email
      )
    );
  };

  const createMeeting = async () => {
    if (!form.title.trim()) {
      alert("Meeting title required");
      return;
    }

    if (
      form.meeting_type === "scheduled" &&
      (!form.scheduled_date ||
        !form.scheduled_time)
    ) {
      alert("Select date and time");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);

      router.push(
        "/sign-in?redirect=/meeting"
      );

      return;
    }

    const meetingId =
      crypto.randomUUID();

    const meetingLink =
      `${window.location.origin}/meeting/${meetingId}`;

    const scheduledAt =
      form.meeting_type ===
      "scheduled"
        ? `${form.scheduled_date}T${form.scheduled_time}`
        : null;

    const { data, error } =
      await supabase
        .from("meetings2")
        .insert([
          {
            id: meetingId,
            title: form.title,
            meeting_type:
              form.meeting_type,
            privacy: form.privacy,
            meeting_link:
              meetingLink,
            participants,
            host_email:
              user.email,
            scheduled_at:
              scheduledAt,
            status: "active",
          },
        ])
        .select();

    console.log(
      "Inserted Data:",
      data
    );
    console.log(
      "Insert Error:",
      error
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (participants.length > 0) {
      const participantRows =
        participants.map(
          (email) => ({
            meeting_id:
              meetingId,
            email,
            role:
              "participant",
            invitation_status:
              "pending",
          })
        );

      const {
        error:
          participantError,
      } = await supabase
        .from(
          "meeting_participants"
        )
        .insert(
          participantRows
        );

      if (
        participantError
      ) {
        console.error(
          participantError
        );
      }
    }

    if (
      form.meeting_type ===
      "instant"
    ) {
      router.push(
        `/meeting/${meetingId}`
      );
    } else {
      alert(
        "Meeting Scheduled Successfully"
      );
      router.push(
        "/meetings"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-black">
      <Sidebar
        open={sidebarOpen}
        setOpen={
          setSidebarOpen
        }
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-10">
        <button
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
          className="lg:hidden mb-4 text-2xl"
        >
          ☰
        </button>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Create Meeting
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Start instantly or
            schedule for later
          </p>

          {/* Title */}

          <div className="mt-8">
            <label className="font-medium">
              Meeting Title
            </label>

            <input
              placeholder="Enter meeting title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          {/* Type */}

          <div className="mt-8">
            <label className="font-medium">
              Meeting Type
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <button
                onClick={() =>
                  setForm({
                    ...form,
                    meeting_type:
                      "instant",
                  })
                }
                className={`border p-5 rounded-2xl ${
                  form.meeting_type ===
                  "instant"
                    ? "border-indigo-600 bg-indigo-50"
                    : ""
                }`}
              >
                Instant Meeting
              </button>

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    meeting_type:
                      "scheduled",
                  })
                }
                className={`border p-5 rounded-2xl ${
                  form.meeting_type ===
                  "scheduled"
                    ? "border-indigo-600 bg-indigo-50"
                    : ""
                }`}
              >
                Schedule
                Meeting
              </button>
            </div>
          </div>

          {/* Schedule */}

          {form.meeting_type ===
            "scheduled" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <input
                type="date"
                value={
                  form.scheduled_date
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    scheduled_date:
                      e.target
                        .value,
                  })
                }
                className="border rounded-xl p-3"
              />

              <input
                type="time"
                value={
                  form.scheduled_time
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    scheduled_time:
                      e.target
                        .value,
                  })
                }
                className="border rounded-xl p-3"
              />
            </div>
          )}

          {/* Privacy */}

          <div className="mt-8">
            <label className="font-medium">
              Privacy
            </label>

            <select
              value={form.privacy}
              onChange={(e) =>
                setForm({
                  ...form,
                  privacy:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="public">
                Public
              </option>

              <option value="private">
                Private
              </option>
            </select>
          </div>

          {/* Participants */}

          <div className="mt-8">
            <label className="font-medium">
              Participants
            </label>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <input
                value={
                  participantInput
                }
                onChange={(e) =>
                  setParticipantInput(
                    e.target.value
                  )
                }
                placeholder="Enter email"
                className="flex-1 border rounded-xl p-3"
              />

              <button
                onClick={
                  addParticipant
                }
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl w-full sm:w-auto"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {participants.map(
                (email) => (
                  <div
                    key={email}
                    className="bg-indigo-100 px-3 py-2 rounded-full flex items-center gap-2 max-w-full"
                  >
                    <span className="truncate">
                      {email}
                    </span>

                    <button
                      onClick={() =>
                        removeParticipant(
                          email
                        )
                      }
                    >
                      ✕
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Meeting Link */}

          <div className="mt-8">
            <label className="font-semibold text-gray-900">
              Meeting Link
            </label>

            <div className="flex flex-col sm:flex-row mt-2 gap-2 sm:gap-0">
              <input
                value={
                  previewMeetingLink
                }
                readOnly
                className="flex-1 border rounded-xl sm:rounded-r-none p-3 bg-gray-50 text-gray-700"
              />

              <button
                onClick={copyLink}
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl sm:rounded-l-none"
              >
                Copy
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Share this link
              with participants
            </p>
          </div>

          {/* Create */}

          <button
            onClick={
              createMeeting
            }
            disabled={loading}
            className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl text-sm sm:text-base"
          >
            {loading
              ? "Creating..."
              : form.meeting_type ===
                "instant"
              ? "Start Meeting Now"
              : "Schedule Meeting"}
          </button>
        </div>
      </main>
    </div>
  );
}