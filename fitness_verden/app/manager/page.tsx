"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JwtPayload, parseJwt } from "@/app/lib/parseJwt";
import { CreateTrainerForm } from "./components/CreateTrainerForm";
import styles from "./manager.module.css";

export default function ManagerPage() {
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
    if (!payload || payload.Role !== "Manager") {
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
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      <div className={styles.mainContent}>
        <main className={styles.contentWrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Manager Dashboard</h1>
            <p className={styles.subtitle}>Welcome back, {user?.Name} :)</p>
          </div>

          <CreateTrainerForm />
        </main>
      </div>
    </div>
  );
}
