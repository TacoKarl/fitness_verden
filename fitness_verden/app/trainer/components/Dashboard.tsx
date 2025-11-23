import styles from "./components.module.css";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.dashboardCard}>
        <h2 className={styles.dashboardCardTitle}>My Clients</h2>
        <p className={styles.dashboardCardDescription}>
          View and manage clients
        </p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => onNavigate("clients")}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            View All Clients
          </button>
          <button
            onClick={() => onNavigate("createClient")}
            className={`${styles.button} ${styles.buttonSuccess}`}
          >
            Create New Client
          </button>
        </div>
      </div>

      <div className={styles.dashboardCard}>
        <h2 className={styles.dashboardCardTitle}>Workout Programs</h2>
        <p className={styles.dashboardCardDescription}>
          Create and manage workout programs
        </p>
        <button
          onClick={() => onNavigate("programs")}
          className={`${styles.button} ${styles.buttonPurple}`}
        >
          View Programs
        </button>
        <p className={styles.badge}>🚧 Ready to build</p>
      </div>
    </div>
  );
}
