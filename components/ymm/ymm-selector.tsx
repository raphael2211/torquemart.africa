"use client";
import { useState } from "react";
import { Search, Gauge } from "lucide-react";

export function YMMSelector() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  return (
    <div className="relative bg-gradient-to-br from-torque-navy to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-4xl mx-auto">
      {/* Gauge Cluster Aesthetic */}
      <div className="absolute top-0 right-0 opacity-10">
        <Gauge size={200} className="text-torque-red" />
      </div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-heading font-bold text-white tracking-tight mb-2">
          Find Your Part
        </h2>
        <p className="text-gray-400 font-body mb-6">
          Select your vehicle to guarantee fitment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Year */}
          <div className="col-span-1">
            <label className="block text-xs font-heading font-semibold text-torque-red uppercase tracking-wider mb-1">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 font-body focus:outline-none focus:ring-2 focus:ring-torque-red focus:border-transparent transition"
            >
              <option value="">Select Year</option>
              {[2024, 2023, 2022, 2021, 2020].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
          
          {/* Make */}
          <div className="col-span-1">
            <label className="block text-xs font-heading font-semibold text-torque-red uppercase tracking-wider mb-1">
              Make
            </label>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 font-body focus:outline-none focus:ring-2 focus:ring-torque-red focus:border-transparent transition"
            >
              <option value="">Select Make</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Ford</option>
            </select>
          </div>

          {/* Model */}
          <div className="col-span-1">
            <label className="block text-xs font-heading font-semibold text-torque-red uppercase tracking-wider mb-1">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 font-body focus:outline-none focus:ring-2 focus:ring-torque-red focus:border-transparent transition"
            >
              <option value="">Select Model</option>
              <option>Camry</option>
              <option>Civic</option>
              <option>F-150</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="col-span-1 flex items-end">
            <button className="w-full bg-torque-red hover:bg-red-700 text-white font-heading font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2">
              <Search size={18} />
              Search Parts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}