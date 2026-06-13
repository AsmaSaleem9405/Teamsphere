"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Logo from "@/app/components/logo";

import {
  signUp,
  signInWithGoogle,
  signInWithMicrosoft,
} from "@/app/lib/supabase/auth";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    setError("");

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

    if (!agree) {
      setError(
        "Please accept Terms of Service and Privacy Policy"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await signUp(
      email,
      password,
      fullName
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    alert(
      "Account created successfully. Please verify your email."
    );

    router.push("/sign-in");
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
            placeholder="John Doe"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
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
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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
              type={
                showPassword ? "text" : "password"
              }
              placeholder="********"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full h-12 border border-gray-300 rounded-xl text-gray-900 px-4 pr-12 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <FaEyeSlash className="text-indigo-600" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
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
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="********"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full h-12 border border-gray-300 rounded-xl text-gray-900 px-4 pr-12 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-indigo-600" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-6">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) =>
              setAgree(e.target.checked)
            }
            className="mt-1"
          />

          <p className="text-sm text-gray-500">
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-indigo-600"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-indigo-600"
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Create Account */}
        <button
          onClick={register}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
        >
          {loading
            ? "Creating Account..."
            : "Create account"}
        </button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="border-t" />

          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-sm text-gray-500">
            or continue with
          </span>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={async () =>
              await signInWithGoogle()
            }
            className="h-12 border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Image
              src="/icons/google.png"
              alt="Google"
              width={20}
              height={20}
            />

            <span className="text-sm font-medium">
              Google
            </span>
          </button>

          <button
            onClick={async () =>
              await signInWithMicrosoft()
            }
            className="h-12 border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Image
              src="/icons/microsoft.png"
              alt="Microsoft"
              width={20}
              height={20}
            />

            <span className="text-sm font-medium">
              Microsoft
            </span>
          </button>

        </div>

        {/* Sign In */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}