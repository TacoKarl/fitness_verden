"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { JwtPayload, parseJwt } from "@/app/lib/parseJwt";
import { Dashboard } from "./components/Dashboard";
import { ClientsList } from "./components/clients/ClientsList";
import { CreateClientForm } from "./components/clients/CreateClientForm";
import styles from "./trainer.module.css";
import { CreateWorkoutProgramForm } from "./components/workoutPrograms/CreateWorkoutProgramForm";
import { WorkoutProgramsList } from "./components/workoutPrograms/WorkoutProgramsList";

export default function TrainerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<JwtPayload | null>(null);

  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "clients"
    | "createClient"
    | "createWorkoutPrograms"
    | "workoutPrograms"
  >("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const payload = parseJwt(token);
    if (!payload || payload.Role !== "PersonalTrainer") {
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
        <p className={styles.loadingText}>Loading...</p>
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
            <h1 className={styles.title}>Personal Trainer Dashboard</h1>
            <p className={styles.subtitle}>Welcome back, {user?.Name} :)</p>
          </div>

          <div className={styles.tabContainer}>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`${styles.tab} ${
                activeTab === "dashboard"
                  ? styles.tabActive
                  : styles.tabInactive
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("clients")}
              className={`${styles.tab} ${
                activeTab === "clients" ? styles.tabActive : styles.tabInactive
              }`}
            >
              Clients
            </button>
            <button
              onClick={() => setActiveTab("createClient")}
              className={`${styles.tab} ${
                activeTab === "createClient"
                  ? styles.tabActive
                  : styles.tabInactive
              }`}
            >
              Create Client
            </button>
            <button
              onClick={() => setActiveTab("workoutPrograms")}
              className={`${styles.tab} ${
                activeTab === "workoutPrograms"
                  ? styles.tabActive
                  : styles.tabInactive
              }`}
            >
              Workout Programs
            </button>
            <button
              onClick={() => setActiveTab("createWorkoutPrograms")}
              className={`${styles.tab} ${
                activeTab === "createWorkoutPrograms"
                  ? styles.tabActive
                  : styles.tabInactive
              }`}
            >
              Create Program
            </button>
          </div>

          {activeTab === "dashboard" && (
            <Dashboard onNavigate={(tab) => setActiveTab(tab as any)} />
          )}
          {activeTab === "clients" && (
            <ClientsList onCreateClick={() => setActiveTab("createClient")} />
          )}
          {activeTab === "createClient" && (
            <CreateClientForm onSuccess={() => setActiveTab("clients")} />
          )}
          {activeTab === "createWorkoutPrograms" && (
            <CreateWorkoutProgramForm
              onSuccess={() => setActiveTab("workoutPrograms")}
            />
          )}
          {activeTab === "workoutPrograms" && (
            <WorkoutProgramsList
              onCreateClick={() => setActiveTab("createWorkoutPrograms")}
            />
          )}
        </main>
      </div>
    </div>
  );
}
