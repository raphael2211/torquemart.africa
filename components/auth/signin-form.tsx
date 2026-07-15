"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

interface SignInFormProps {
  onCreateAccount: () => void;
  onForgotPassword: () => void;
}

export default function SignInForm({
  onCreateAccount,
  onForgotPassword,
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Torque Mart</h1>

        <h2 className="mt-3 text-xl font-semibold">
          Welcome Back
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Sign in to continue to your account.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
  id="signin-email"
  name="email"
  type="email"
  autoComplete="email"
  placeholder="you@example.com"
  className="w-full rounded-xl border border-gray-300 bg-transparent py-3 pl-11 pr-4 outline-none transition focus:border-black dark:border-neutral-700 dark:focus:border-white"
/>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
  id="signin-password"
  name="current-password"
  type={showPassword ? "text" : "password"}
  autoComplete="current-password"
  placeholder="••••••••"
  className="w-full rounded-xl border border-gray-300 bg-transparent py-3 pl-11 pr-12 outline-none transition focus:border-black dark:border-neutral-700 dark:focus:border-white"
/>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
  type="button"
  onClick={onForgotPassword}
  className="text-sm hover:underline"
>
  Forgot Password?
</button>
        </div>

        {/* Sign In */}
        <button
          type="submit"
          className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center">
        <div className="h-px flex-1 bg-gray-300 dark:bg-neutral-700" />

        <span className="mx-4 text-sm text-gray-500">
          or continue with
        </span>

        <div className="h-px flex-1 bg-gray-300 dark:bg-neutral-700" />
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 transition hover:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          <FcGoogle size={22} />
          Google
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 transition hover:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          <FaApple size={20} />
          Apple
        </button>
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        New here?{" "}
        <button
          type="button"
          onClick={onCreateAccount}
          className="font-semibold text-black hover:underline dark:text-white"
        >
          Create Account
        </button>
      </p>
    </div>
  );
}