"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TermsPage from "@/app/terms/page";
import PrivacyPage from "@/app/privacy/page";
import Logo from "@/app/components/logo";
import { supabase } from "@/app/lib/supabase/client";
import { signUp } from "@/app/lib/supabase/auth";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");

  const register = async () => {
  setError("");

  try {
    setLoading(true);

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (checkError) {
      console.log(checkError);
    }

    if (existingUser) {
      setError("This email is already registered. Please sign in.");
      return;
    }

    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agree) {
      setError("Please accept Terms of Service and Privacy Policy");
      return;
    }
const res = await fetch("/api/check-user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
  }),
});

const { exists } = await res.json();

if (exists) {
  setError(
    "This email is already registered. Please sign in."
  );
  return;
}
    const { error } = await signUp(
      email,
      password,
      fullName
    );

    if (error) {
      setError(error.message);
      return;
    }

    alert("Account created successfully. Please verify your email.");
    router.push("/sign-in");
  } catch (err) {
    setError(err?.message || "Failed to create account");
  } finally {
    setLoading(false);
  }
};
  // ✅ FIXED GOOGLE LOGIN (IMPORTANT PART)
  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setGoogleLoading(true);

      // 🔥 FORCE LOGOUT FIRST
      await supabase.auth.signOut();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: "select_account consent",
            access_type: "offline",
          },
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError(err?.message || "Google sign in failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

        {/* Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">
          Create your account
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Get started with your free account
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-xl text-gray-900 px-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-xl text-gray-900 px-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-xl text-gray-900 px-4 pr-12 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-xl text-gray-900 px-4 pr-12 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-6">
  <input
    type="checkbox"
    checked={agree}
    onChange={(e) => setAgree(e.target.checked)}
    className="mt-1"
  />

  <p className="text-sm text-gray-500">
    I agree to{" "}
    <Link
      href="/terms"
      className="text-blue-600 hover:text-blue-700 underline"
      target="_blank"
    >
      Terms of Service
    </Link>{" "}
    and{" "}
    <Link
      href="/privacy"
      className="text-blue-600 hover:text-blue-700 underline"
      target="_blank"
    >
      Privacy Policy
    </Link>
  </p>
</div>

        {/* Create Account */}
        <button
          onClick={register}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-indigo-600 text-white font-medium"
        >
          {loading ? "Creating Account..." : "Create account"}
        </button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="border-t" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-sm text-gray-500">
            or continue with
          </span>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full h-12 border text-black border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <Image src="/icons/google.png" alt="Google" width={20} height={20} />

          <span className="text-sm font-medium">
            {googleLoading ? "Redirecting..." : "Google"}
          </span>
        </button>

        {/* Sign in */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-indigo-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}