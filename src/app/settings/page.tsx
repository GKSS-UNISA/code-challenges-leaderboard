// Add logic to display user settings (name, email, etc.)
export default function Settings() {
  return (
    <main className="flex flex-col items-start justify-start min-h-[calc(100vh-64px)] p-6 w-full">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
      </div>

      <div className="w-full flex flex-col items-start justify-start gap-6">
        <div className="w-full bg-popover p-4">
          <h1 className="font-bold text-2xl mb-2 rounded-md">Name</h1>
          <span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
            />
          </span>
        </div>

        <div className="w-full bg-popover p-4">
          <h1 className="font-bold text-2xl mb-2 rounded-md">
            GitHub Username
          </h1>
          <span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
            />
          </span>
        </div>

        <div className="w-full bg-popover p-4">
          <h1 className="font-bold text-2xl mb-2 rounded-md">Points Earned</h1>
          <span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your name"
            />
          </span>
        </div>
      </div>
    </main>
  );
}
