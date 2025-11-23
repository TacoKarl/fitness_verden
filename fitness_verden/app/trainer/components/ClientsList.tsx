import { useEffect } from "react";
import { useClients } from "../hooks/useClients";
import styles from "./components.module.css";

interface ClientsListProps {
  onCreateClick: () => void;
}

export function ClientsList({ onCreateClick }: ClientsListProps) {
  const { clients, loading, error, fetchClients } = useClients();

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>My Clients</h2>
        <button
          onClick={onCreateClick}
          className={`${styles.button} ${styles.buttonSuccess}`}
        >
          + Create New Client
        </button>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {loading ? (
        <p className={styles.emptyStateText}>Loading clients...</p>
      ) : clients.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            No clients yet. Create your first client!
          </p>
          <button
            onClick={onCreateClick}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Create Your First Client
          </button>
        </div>
      ) : (
        <div className={styles.clientsList}>
          {clients.map((client) => (
            <div key={client.userId} className={styles.clientCard}>
              <h3 className={styles.clientName}>
                {client.firstName} {client.lastName}
              </h3>
              <p className={styles.clientEmail}>{client.email}</p>
              <p className={styles.clientType}>
                Account Type: {client.accountType}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
