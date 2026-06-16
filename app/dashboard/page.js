"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase/client";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    console.log("Dashboard User:", user);

    setUser(user);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow p-8">

          <h1 className="text-4xl font-bold text-black">
            TeamSphere Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back
          </p>

          <div className="mt-6 p-4 border rounded-xl">
            <p className="text-black">
              Logged in as:
            </p>

            <p className="font-semibold text-indigo-600">
              {user?.email}
            </p>
          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={() => router.push("/meeting")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
              Create Meeting
            </button>

            <button
              onClick={() => router.push("/meetings")}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              My Meetings
            </button>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-6 py-3 rounded-xl"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}