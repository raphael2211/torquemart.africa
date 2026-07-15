"use client";

import { Mail, ArrowLeft } from "lucide-react";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export default function ForgotPasswordForm({
  onBack,
}: ForgotPasswordFormProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Forgot Password
        </h1>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Enter the email address associated with your account and
          we'll send you a password reset link.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 bg-transparent py-3 pl-11 pr-4 outline-none transition focus:border-black dark:border-neutral-700 dark:focus:border-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black"
        >
          Send Reset Link
        </button>
      </form>

      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="mt-8 flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Sign In
      </button>
    </div>
  );
}