// app/page.tsx
"use client";
import { useState } from "react";
import { Search, Gauge } from "lucide-react";
import Hero from "@/components/home/hero";
import CategoryGrid from "@/components/home/category-grid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <CategoryGrid />
      </section>
    </main>
  );
}