import { useEffect } from "react";
import styles from "../components.module.css";
import { useWorkoutPrograms } from "@/app/api/hooks/useWorkoutPrograms";
import { useClients } from "@/app/api/hooks/useClients";

interface ProgramListProps {
  onCreateClick: () => void;
}

export function WorkoutProgramsList({ onCreateClick }: ProgramListProps) {
  const { programs, loading, error, fetchWorkoutPrograms } =
    useWorkoutPrograms();
  const { clients, fetchClients } = useClients();

  useEffect(() => {
    fetchWorkoutPrograms();
    fetchClients();
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>My Workout Programs</h2>
        <button
          onClick={onCreateClick}
          className={`${styles.button} ${styles.buttonSuccess}`}
        >
          + Create New Workout Program
        </button>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {loading ? (
        <p className={styles.emptyStateText}>Loading workout programs...</p>
      ) : programs.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            No workout programs yet. Create your first workout program!
          </p>
          <button
            onClick={onCreateClick}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Create Your First Workout Program
          </button>
        </div>
      ) : (
        <div className={styles.clientsList}>
          {programs.map((program) => {
            // Find the client for this program
            const client = clients.find((c) => c.userId === program.clientId);

            return (
              <div key={program.workoutProgramId} className={styles.clientCard}>
                <h3 className={styles.clientName}>{program.name}</h3>
                <p className={styles.clientEmail}>{program.description}</p>
                <p className={styles.clientType}>
                  Client:{" "}
                  {client
                    ? `${client.firstName} ${client.lastName}`
                    : "Unknown"}
                </p>
                <p className={styles.clientType}>
                  Exercises: {program.exercises.length}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
