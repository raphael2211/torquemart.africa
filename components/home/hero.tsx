export default function Hero() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <span className="rounded-full border px-4 py-2 text-sm font-medium">
          Africa's Trusted Auto Marketplace
        </span>

        <h1 className="mt-6 text-5xl font-bold leading-tight">
          Find Genuine Auto Parts
          <br />
          With Confidence.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
          Search millions of genuine and aftermarket parts using your vehicle,
          OEM number, SKU, or part name.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-xl bg-black px-6 py-3 text-white">
            Browse Parts
          </button>

          <button className="rounded-xl border px-6 py-3">
            Join Waitlist
          </button>
        </div>
      </div>
    </section>
  );
}