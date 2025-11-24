"use client";
import Image from "next/image";
import styles from "@/app/ui/home.module.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://assignment2.swafe.dk/api/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Password or Email invalid");
      }

      const data = await res.json();
      console.log("Login successful: ", data);

      if (data.jwt) {
        localStorage.setItem("token", data.jwt);
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center p-8 bg-white dark:bg-black rounded-2xl shadow-lg">
        <h1 className="text-5xl">Velkommen til Fitness Verden</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-black dark:bg-white p-8 rounded-2xl shadow-md w-80 items-center"
        >
          <h1 className="text-2xl font-bold mb-4 text-center dark:text-black text-white">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full p-2 mb-3 dark:text-black text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full p-2 mb-3 dark:text-black text-white"
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </form>
      </main>
    </div>
  );
}
