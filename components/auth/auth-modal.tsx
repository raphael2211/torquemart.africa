// auth-modal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import SignInForm from "./signin-form";
import SignUpForm from "./signup-form";
import ForgotPasswordForm from "./forgot-password";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type View = "signin" | "signup" | "forgot";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<View>("signin");
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Portals need the DOM, so only render after client mount (SSR-safe)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset whenever opened
  useEffect(() => {
    if (isOpen) {
      setView("signin");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll back to top whenever it opens or the view switches, and
  // defend against browser autofill re-scrolling the container afterward.
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const resetScroll = () => {
      if (modalRef.current) modalRef.current.scrollTop = 0;
    };

    resetScroll();
    const raf = requestAnimationFrame(resetScroll);
    const timeout = setTimeout(resetScroll, 150);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [isOpen, view]);

  // Close with ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handler);
    }

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-md flex-col rounded-3xl bg-white shadow-2xl dark:bg-neutral-900"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <X size={20} />
        </button>

        <div ref={modalRef} className="min-h-0 overflow-y-auto p-8">
          {view === "signin" && (
            <SignInForm
              onCreateAccount={() => setView("signup")}
              onForgotPassword={() => setView("forgot")}
            />
          )}

          {view === "signup" && <SignUpForm onSignIn={() => setView("signin")} />}

          {view === "forgot" && <ForgotPasswordForm onBack={() => setView("signin")} />}
        </div>
      </div>
    </div>,
    document.body
  );
}