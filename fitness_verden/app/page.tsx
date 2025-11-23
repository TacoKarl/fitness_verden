"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JwtPayload, parseJwt } from "@/app/lib/parseJwt";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const payload = parseJwt(token);
    if (!payload || !payload.Role) {
      router.push("/login");
      return;
    }

    setUser(payload);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <main className="flex flex-col items-center justify-center space-y-6 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Velkommen til Fitness Verden
            </h1>
            {user?.Role === "Manager" && <p>Manager Dashboard</p>}
            {user?.Role === "PersonalTrainer" && <p>Trainer Dashboard</p>}
            {user?.Role === "Client" && <p>Client Dashboard</p>}
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back, {user?.Name}!
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
