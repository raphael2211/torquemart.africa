// app/survey/page.tsx
"use client";

import { useState } from "react";
import { Car, Wrench, ShieldCheck, Coins, Loader2, CheckCircle2 } from "lucide-react";

type FormData = {
  interest: string;
  vehicleTypes: string[];
  budget: string;
  referral: string;
};

const INTEREST_OPTIONS = [
  { id: "buy-vehicle", label: "Buying a vehicle", icon: Car },
  { id: "sell-vehicle", label: "Selling a vehicle", icon: Car },
  { id: "buy-parts", label: "Buying parts & accessories", icon: Wrench },
  { id: "sell-parts", label: "Selling parts & accessories", icon: Wrench },
  { id: "inspection", label: "Vehicle inspection & verification", icon: ShieldCheck },
  { id: "financing", label: "Auto financing", icon: Coins },
];

const VEHICLE_TYPES = [
  "Sedan",
  "SUV",
  "Truck / Van",
  "Motorcycle",
  "Tricycle (Keke)",
  "Heavy duty / Commercial",
];

const BUDGET_OPTIONS = [
  "Under ₦2,000,000",
  "₦2,000,000 – ₦5,000,000",
  "₦5,000,000 – ₦10,000,000",
  "Above ₦10,000,000",
  "Not applicable",
];

const REFERRAL_OPTIONS = [
  "Social media",
  "Friend or referral",
  "Google search",
  "Online advert",
  "Other",
];

const INITIAL_FORM: FormData = {
  interest: "",
  vehicleTypes: [],
  budget: "",
  referral: "",
};

export default function SurveyPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleVehicleType(type: string) {
    setFormData((prev) => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(type)
        ? prev.vehicleTypes.filter((t) => t !== type)
        : [...prev.vehicleTypes, type],
    }));
  }

  async function handleSubmit() {
    if (formData.interest === "" || formData.referral === "") {
      setError("Please select what you're interested in and how you heard about us.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Something went wrong. Please try again.");

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-2xl px-6 py-16">
        {!isSubmitted && (
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Help Us Build Torque Mart</h1>
            <p className="text-muted-foreground">
              A quick 4-question survey to help us tailor the marketplace to you.
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thanks for your feedback! 🙌</h2>
              <p className="text-muted-foreground">
                Your answers help us shape Torque Mart before launch.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2.5">
                  What are you mainly interested in?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTEREST_OPTIONS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => updateField("interest", id)}
                      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                        formData.interest === id
                          ? "border-primary bg-primary/5 text-primary font-medium"
                          : "border-border hover:bg-muted/60"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2.5">
                  Vehicle types you care about{" "}
                  <span className="text-muted-foreground">(optional, select any)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {VEHICLE_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleVehicleType(type)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                        formData.vehicleTypes.includes(type)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Budget range <span className="text-muted-foreground">(optional)</span>
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                  className="w-full rounded-xl border border-border py-2.5 px-3.5 text-sm outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="">Select a range</option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">
                  How did you hear about Torque Mart?
                </label>
                <select
                  value={formData.referral}
                  onChange={(e) => updateField("referral", e.target.value)}
                  className="w-full rounded-xl border border-border py-2.5 px-3.5 text-sm outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="">Select an option</option>
                  {REFERRAL_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-1.5 rounded-full bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Survey"
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}