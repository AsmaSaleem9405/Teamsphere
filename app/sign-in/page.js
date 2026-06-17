"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "@/app/lib/supabase/client";
import Logo from "@/app/components/logo";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const [redirect, setRedirect] = useState("/dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ SAFE redirect handling (no useSearchParams)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("redirect");
    if (r) setRedirect(r);
  }, []);

  // ✅ Safe session check
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (mounted && data?.session) {
        router.replace(redirect || "/dashboard");
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [router, redirect]);

  // LOGIN
  const login = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.exists) {
        setError("This account is not registered. Please sign up.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Incorrect password.");
        return;
      }

      router.push(redirect || "/dashboard");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const googleLogin = async () => {
    try {
      await supabase.auth.signOut();

      const origin =
        typeof window !== "undefined" ? window.location.origin : "";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(
            redirect || "/dashboard"
          )}`,
          queryParams: {
            prompt: "select_account consent",
            access_type: "offline",
          },
        },
      });

      if (error) console.log(error.message);
    } catch (err) {
      console.log(err);
    }
  };

  // FACEBOOK LOGIN
  const facebookLogin = async () => {
    try {
      await supabase.auth.signOut();

      const origin =
        typeof window !== "undefined" ? window.location.origin : "";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(
            redirect || "/dashboard"
          )}`,
        },
      });

      if (error) console.log(error.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5 py-10 lg:py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
        <Logo />

        <h1 className="text-3xl font-bold text-gray-900 mt-8">
          Welcome back 👋
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Sign in to your account and continue
        </p>

        {/* ERROR */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-5 border border-gray-200 rounded-xl px-4 py-3"
        />

        {/* PASSWORD */}
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12"
          />

          {showPassword ? (
            <FaEyeSlash
              onClick={() => setShowPassword(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={() => setShowPassword(true)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          )}
        </div>

        {/* LOGIN */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* SOCIAL */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={googleLogin}
            className="border rounded-xl py-3"
          >
            Google
          </button>

          <button
            onClick={facebookLogin}
            className="border rounded-xl py-3"
          >
            Facebook
          </button>
        </div>

        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}