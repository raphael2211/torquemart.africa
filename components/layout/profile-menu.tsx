"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  User,
  Heart,
  Car,
  ClipboardList,
  Clock3,
  Settings,
  CircleHelp,
} from "lucide-react";

import AuthModal from "@/components/auth/auth-modal";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* Profile Icon */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full border p-2 transition hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <User size={22} />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 mt-3 w-80 max-h-[80vh] overflow-y-auto overflow-x-hidden rounded-2xl border bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
          >
            {/* Welcome Section */}
            <div className="p-6">
              <h3 className="text-lg font-semibold">
                Welcome to Torque Mart
              </h3>

              <div className="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                <span>Buy genuine parts.  </span>
                <span>Sell nationwide. </span>
                <span>Track your orders.</span>
              </div>

              <div className="mt-5 space-y-3">
                {/* Sign In */}
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full rounded-xl bg-black py-3 font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black"
                >
                  Sign In
                </button>

                {/* Create Account */}
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="w-full rounded-xl border py-3 font-medium transition hover:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  Create Account
                </button>
              </div>
            </div>

            <hr className="dark:border-neutral-700" />

            {/* Links */}
            <div className="py-2">
              <MenuItem href="/wishlist" icon={<Heart size={18} />}>
                Wishlist
              </MenuItem>

              <MenuItem href="/garage" icon={<Car size={18} />}>
                My Garage
              </MenuItem>

              <MenuItem href="/survey" icon={<ClipboardList size={18} />}>
                Survey
              </MenuItem>

              <MenuItem href="/waitlist" icon={<Clock3 size={18} />}>
                Waitlist
              </MenuItem>
            </div>

            <hr className="dark:border-neutral-700" />

            <div className="py-2">
              <MenuItem href="/settings" icon={<Settings size={18} />}>
                Settings
              </MenuItem>

              <MenuItem href="/help" icon={<CircleHelp size={18} />}>
                Help Center
              </MenuItem>
            </div>
          </div>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

function MenuItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-6 py-3 text-sm transition hover:bg-gray-100 dark:hover:bg-neutral-800"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}