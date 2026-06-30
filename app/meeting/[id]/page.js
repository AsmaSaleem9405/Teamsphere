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
} from "next/navigation";

import { supabase } from "@/app/lib/supabase/client";

export default function MeetingPage() {
  const params = useParams();

  const router = useRouter();

  const roomName = params.id;

  const [token, setToken] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { user },
        } =
          await supabase.auth.getUser();

        let participantName = "Guest";

if (user?.email) {
 participantName = user.email;
}

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
              participantName:
                user.email,
            }),
          }
        );

        const data =
          await res.json();

        if (data.error) {
          console.log(
            data.error
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
  }, [roomName, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-2xl">
        Connecting...
      </div>
    );
  }

  return (
    <div className="h-screen bg-black">
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
        className="h-screen"
        onDisconnected={() =>
          router.push("/")
        }
      >
        <VideoConference />

        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}