"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

interface SignUpFormProps {
  onSignIn: () => void;
}

export default function SignUpForm({ onSignIn }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-muted">Join Africa&apos;s trusted auto marketplace.</p>
      </div>

      <form className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Full Name</label>
          <div className="flex items-center rounded-xl border border-border px-4">
            <User size={18} className="text-muted" />
            <input
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              className="w-full bg-transparent p-3 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <div className="flex items-center rounded-xl border border-border px-4">
            <Mail size={18} className="text-muted" />
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full bg-transparent p-3 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>
          <div className="flex items-center rounded-xl border border-border px-4">
            <Lock size={18} className="text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full bg-transparent p-3 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Create Account
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted">or continue with</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-xl border border-border py-3 hover:bg-surface-raised"
        >
          <FcGoogle size={22} />
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-xl border border-border py-3 hover:bg-surface-raised"
        >
          <FaApple size={20} />
          Apple
        </button>
      </div>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSignIn}
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}