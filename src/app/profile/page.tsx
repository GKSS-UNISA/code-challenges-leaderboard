import UserInfo from "@/components/sections/profile/user-info";

export default function Settings() {
  return (
    <main className="flex flex-col items-start justify-start min-h-[calc(100vh-64px)] p-6 w-full">
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      </div>
      <UserInfo />
    </main>
  );
}
