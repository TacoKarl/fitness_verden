import { useState, useEffect } from "react";
import { useClients, Client } from "../../hooks/useClients";
import { useWorkoutPrograms } from "../../hooks/useWorkoutPrograms";
import styles from "../components.module.css";

interface CreateWorkoutProgramFormProps {
  onSuccess: () => void;
}

export function CreateWorkoutProgramForm({
  onSuccess,
}: CreateWorkoutProgramFormProps) {
  const { createWorkoutProgram } = useWorkoutPrograms();
  const { clients, fetchClients } = useClients();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    clientId: 0,
  });

  // Fetch clients when component mounts
  useEffect(() => {
    fetchClients();
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (formData.clientId === 0) {
      setError("Please select a client");
      setIsSubmitting(false);
      return;
    }

    const result = await createWorkoutProgram({
      name: formData.name,
      description: formData.description,
      clientId: formData.clientId,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccess("Workout program created successfully!");
      setFormData({
        name: "",
        description: "",
        clientId: 0,
      });
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setError(result.error || "Failed to create workout program");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create New Workout Program</h2>

      {success && <div className={styles.successMessage}>{success}</div>}

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className={styles.input}
            placeholder="Enter name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            className={styles.input}
            placeholder="Enter description"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Select Client</label>
          <select
            value={formData.clientId}
            onChange={(e) =>
              setFormData({ ...formData, clientId: Number(e.target.value) })
            }
            required
            className={styles.input}
          >
            <option value={0}>-- Select a client --</option>
            {clients.map((client) => (
              <option key={client.userId} value={client.userId}>
                {client.firstName} {client.lastName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.button} ${styles.buttonPrimary} ${isSubmitting ? styles.buttonDisabled : ""}`}
        >
          {isSubmitting ? "Creating..." : "Create Workout Program"}
        </button>
      </form>
    </div>
  );
}
