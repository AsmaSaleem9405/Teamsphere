"use client";

import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg"
      >
        Logout
      </button>
    </main>
  );
}