"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import TermsPage from "@/app/terms/page";
import PrivacyPage from "@/app/privacy/page";
import Logo from "@/app/components/logo";
import { supabase } from "@/app/lib/supabase/client";
import { signUp } from "@/app/lib/supabase/auth";

export default function SignUpPage() {
  const router = useRouter();

  // ✅ FIX ADDED (KEEP SAME STYLE AS SIGN-IN)
const [redirect, setRedirect] = useState("/dashboard");

useEffect(() => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);

    setRedirect(
      params.get("redirect") || "/dashboard"
    );
  }
}, []);

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
        body: JSON.stringify({ email }),
      });

      const { exists } = await res.json();

      if (exists) {
        setError("This email is already registered. Please sign in.");
        return;
      }

      const { error } = await signUp(email, password, fullName);

      if (error) {
        setError(error.message);
        return;
      }

      alert("Account created successfully. Please verify your email.");

      // ✅ FIXED (ONLY CHANGE HERE)
      router.push(redirect);

    } catch (err) {
      setError(err?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const facebookLogin = async () => {
    try {
      await supabase.auth.signOut();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${typeof window !== "undefined"
  ? window.location.origin
  : ""}/auth/callback`,
        },
      });

      if (error) {
        console.log(error.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setGoogleLoading(true);

      await supabase.auth.signOut();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${typeof window !== "undefined"
  ? window.location.origin
  : ""}/auth/callback`,
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

        <div className="mb-8">
          <Logo />
        </div>

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
              className="absolute right-4 top-1/2 text-indigo-600 -translate-y-1/2"
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
              className="absolute right-4 top-1/2 text-indigo-600 -translate-y-1/2"
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
            <Link href="/terms" className="text-blue-600 underline" target="_blank">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 underline" target="_blank">
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

        {/* Google + Facebook */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full h-12 border border-gray-300 rounded-xl flex items-center justify-center gap-2"
          >
            <Image src="/icons/google.png" alt="Google" width={20} height={20} />
            Google
          </button>

          <button
            onClick={facebookLogin}
            className="w-full h-12 border border-gray-300 rounded-xl flex items-center justify-center gap-2"
          >
            <Image src="/icons/facebook.png" alt="Facebook" width={20} height={20} />
            Facebook
          </button>
        </div>

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