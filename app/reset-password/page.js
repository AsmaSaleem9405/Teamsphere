"use client"

import { useState } from "react"
import { supabase } from "@/app/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Password updated successfully!")

      setTimeout(() => {
        router.push("/sign-in")
      }, 2000)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-xl text-black font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleUpdatePassword}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Update Password
        </button>

        {message && (
          <p className="mt-3 text-sm text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}