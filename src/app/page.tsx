export default function Home() {
  return (
    <section className="container w-full">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-lg text-gray-700">
        This is a simple application built with Next.js and Tailwind CSS.
      </p>
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </section>
  );
}
