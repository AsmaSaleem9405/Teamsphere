"use client";
export const dynamic = "force-dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "@/app/lib/supabase/client";
import Logo from "@/app/components/logo";
import { useRouter, useSearchParams } from "next/navigation";
export default function SignInPage() {
  const router = useRouter();
const searchParams = useSearchParams();

const redirect = searchParams.get("redirect");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

 useEffect(() => {
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push(redirect || "/dashboard");
    }
  };

  checkSession();
}, [router, redirect]);

  const login = async () => {
  try {
    setLoading(true);
    setError("");

    // Check if user exists
    const res = await fetch("/api/check-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    if (!data.exists) {
      setError(
        "This account is not registered. Please sign up."
      );
      return;
    }

    const { error } =
      await supabase.auth.signInWithPassword({
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
    setError(err.message);
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
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(
          redirect || "/dashboard"
        )}`,
      },
    });

    if (error) {
      console.log(error.message);
    }
  } catch (err) {
    console.log(err);
  }
};
const googleLogin = async () => {
  try {
    await supabase.auth.signOut();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(
          redirect || "/dashboard"
        )}`,
        queryParams: {
          prompt: "select_account consent",
          access_type: "offline",
        },
      },
    });

    if (error) {
      console.log(error.message);
    }
  } catch (err) {
    console.log(err);
  }
};


  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5 py-10 lg:py-16">
  <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">

        {/* Logo */}
        <Logo />

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mt-8">
          Welcome back 👋
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Sign in to your account and continue
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-200 text-gray-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-200 text-gray-700 rounded-xl px-4 py-3 pr-12 outline-none focus:border-indigo-500"
            />

            {showPassword ? (
              <FaEyeSlash
                onClick={() =>
                  setShowPassword(false)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-indigo-600"
              />
            ) : (
              <FaEye
                onClick={() =>
                  setShowPassword(true)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-indigo-600 text-gray-400"
              />
            )}
          </div>
        </div>

        {/* Remember */}
      {/* Remember */}
<div className="flex justify-between items-center mt-5 mb-7 text-sm">
  <label className="flex items-center gap-2 text-gray-600">
    <input type="checkbox" />
    Remember me
  </label>
<div className="text-blue-600 underline">

<Link href="/forgot-password">
  Forgot password?
</Link>
</div>
</div>

        {/* Login Button */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-gray-200"></div>

          <span className="text-sm text-gray-400">
            or continue with
          </span>

          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={googleLogin}
    className="w-full h-12 border text-black border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Image
              src="/icons/google.png"
              alt="Google"
              width={20}
              height={20}
            />
            Google
          </button>

         <button
  onClick={facebookLogin}
    className="w-full h-12 border text-black border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
>
  <Image
    src="/icons/facebook.png"
    alt="Facebook"
    width={20}
    height={20}
  />
  Facebook
</button>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-8">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}