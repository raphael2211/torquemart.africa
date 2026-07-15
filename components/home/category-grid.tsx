const categories = [
  "Engine",
  "Brakes",
  "Suspension",
  "Electrical",
  "Transmission",
  "Tyres & Wheels",
  "Interior",
  "Exterior",
];

export default function CategoryGrid() {
  return (
    <section>
      <h2 className="mb-8 text-3xl font-bold">
        Browse Categories
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category}
            className="rounded-2xl border p-8 text-center transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold">{category}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}