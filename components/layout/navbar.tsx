"use client";
import ProfileMenu from "./profile-menu";
import Link from "next/link";
import { Search, MessageCircle, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Torque Mart"
            className="h-10 w-10"
          />

          <span className="text-xl font-bold">
            Torque Mart
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="/">Home</Link>

          <Link href="/categories">
            Categories
          </Link>

          <Link href="/search">
            Find Parts
          </Link>

          <Link href="/sell">
            Sell
          </Link>

          <Link href="/waitlist">
            Waitlist
          </Link>

          <Link href="/survey">
            Survey
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden w-[380px] items-center rounded-full border border-neutral-300 px-4 py-2 lg:flex dark:border-neutral-700">

          <Search className="mr-2 h-4 w-4 text-neutral-500" />

          <input
            type="text"
            placeholder="Search part number, OEM, SKU..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          <button>
            <MessageCircle className="h-6 w-6" />
          </button>

          <button>
            <ShoppingCart className="h-6 w-6" />
          </button>

          <ProfileMenu />

        </div>

      </div>
    </header>
  );
}