"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ ensure user came from email link
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } =
        await supabase.auth.getSession();

      if (!session) {
        router.push("/sign-in");
      }
    };

    checkSession();
  }, [router]);

  const updatePassword = async () => {
    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setMessage("Password updated successfully!");

      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">

        <h1 className="text-xl font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-3"
        />

        <button
          onClick={updatePassword}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {message && (
          <p className="mt-3 text-sm text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}