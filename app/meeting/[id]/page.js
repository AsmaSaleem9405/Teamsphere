"use client";

import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";

import "@livekit/components-styles";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  FaShieldAlt,
} from "react-icons/fa";

import { supabase } from "@/app/lib/supabase/client";

export default function MeetingPage() {
  const params = useParams();

  const router = useRouter();

  const searchParams =
    useSearchParams();

  // ROOM ID

  const roomName = params.id;

  // MEETING TITLE

  const meetingTitle =
    searchParams.get("title") ||
    "TeamSphere Meeting";

  // STATES

  const [token, setToken] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [meetingTime, setMeetingTime] =
    useState(0);

  // TIMER

  useEffect(() => {
    const interval =
      setInterval(() => {
        setMeetingTime(
          (prev) => prev + 1
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  // GET TOKEN

  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        // CLEAN NAME

    let participantName =
  "Guest";

if (
  user?.user_metadata?.full_name
) {
  participantName =
    user.user_metadata.full_name;
} else if (
  user?.user_metadata?.name
) {
  participantName =
    user.user_metadata.name;
} else if (user?.email) {
  participantName =
    user.email.split("@")[0];
}
        // GET LIVEKIT TOKEN

        const res = await fetch(
          "/api/livekit",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              roomName,
              participantName,
            }),
          }
        );

        const data =
          await res.json();

        if (!data.token) {
          alert(
            "Failed to connect"
          );

          return;
        }

        setToken(data.token);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getToken();
  }, [roomName]);

  // LOADING

  if (loading) {
    return (
      <div className="h-screen bg-[#0B0F19] flex items-center justify-center text-white">
        
        <div className="text-center">
          
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-6 text-2xl">
            Connecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0B0F19] text-white overflow-hidden">
      
      {/* TOP BAR */}

      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 backdrop-blur-xl bg-black/20">
        
        {/* LEFT */}

        <div>
          <h1 className="text-xl font-semibold">
            {meetingTitle}
          </h1>

          <p className="text-gray-400 text-sm">
            Room ID: {roomName}
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">
          
          {/* SECURE */}

          <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-xl">
            <FaShieldAlt />

            <span>
              Secure
            </span>
          </div>

          {/* TIMER */}

          <div className="bg-black/40 px-4 py-2 rounded-xl">
            {Math.floor(
              meetingTime / 60
            )}
            :
            {String(
              meetingTime % 60
            ).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* MEETING */}

      <div className="h-[calc(100vh-64px)]">
        
        <LiveKitRoom
          token={token}
          serverUrl={
            process.env
              .NEXT_PUBLIC_LIVEKIT_URL
          }
          connect={true}
          video={true}
          audio={true}
          data-lk-theme="default"
          className="h-full"
          onDisconnected={() =>
            router.push("/")
          }
        >
          {/* VIDEO CONFERENCE */}

          <VideoConference />

          {/* AUDIO */}

          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    </div>
  );
}