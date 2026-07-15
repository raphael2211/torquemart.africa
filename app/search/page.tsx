// app/search/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, X, SlidersHorizontal, Loader2, MapPin } from "lucide-react";

// Replace this with your real data source (API route, database query, etc.)
type Listing = {
  id: string;
  title: string;
  category: string;
  price: number;
  location: string;
};

const MOCK_LISTINGS: Listing[] = [
  { id: "1", title: "Toyota Camry 2018 - Clean Title", category: "Vehicles", price: 8500000, location: "Lagos" },
  { id: "2", title: "Bosch Brake Pads (Front Set)", category: "Parts", price: 25000, location: "Abuja" },
  { id: "3", title: "Michelin 205/55R16 Tyre", category: "Tyres", price: 45000, location: "Port Harcourt" },
  { id: "4", title: "Honda Accord 2016", category: "Vehicles", price: 6200000, location: "Ibadan" },
  { id: "5", title: "Car Battery 12V 65Ah", category: "Electronics", price: 38000, location: "Kano" },
  { id: "6", title: "Alloy Wheel Rim 17-inch", category: "Parts", price: 60000, location: "Lagos" },
];

const CATEGORIES = ["All", "Vehicles", "Parts", "Tyres", "Electronics"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce so we don't "search" on every single keystroke
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      const matchesQuery = item.title
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [debouncedQuery, category]);

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Search</h1>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for cars, parts, tyres..."
            className="w-full rounded-full border border-border bg-white py-3 pl-12 pr-12 text-base outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat === category && <SlidersHorizontal className="h-3 w-3" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Status line */}
        <p className="text-sm text-muted-foreground mb-4">
          {isSearching
            ? "Searching..."
            : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Results */}
        {isSearching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border p-4 hover:shadow-md transition"
              >
                <div className="h-32 w-full rounded-xl bg-muted mb-3 flex items-center justify-center text-muted-foreground text-sm">
                  Image
                </div>
                <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                <p className="text-primary font-bold mb-2">
                  ₦{item.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}