import { useState } from "react";
import { useClients } from "@/app/api/hooks/useClients";
import styles from "../components.module.css";

interface CreateClientFormProps {
  onSuccess: () => void;
}

export function CreateClientForm({ onSuccess }: CreateClientFormProps) {
  const { createClient } = useClients();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsSubmitting(false);
      return;
    }

    const result = await createClient({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccess("Client created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setError(result.error || "Failed to create client");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create New Client</h2>

      {success && <div className={styles.successMessage}>{success}</div>}

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            className={styles.input}
            placeholder="Enter first name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
            className={styles.input}
            placeholder="Enter last name"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className={styles.input}
            placeholder="Enter email"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className={styles.input}
            placeholder="Create a password"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            className={styles.input}
            placeholder="Confirm password"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.button} ${styles.buttonPrimary} ${isSubmitting ? styles.buttonDisabled : ""}`}
        >
          {isSubmitting ? "Creating..." : "Create Client"}
        </button>
      </form>
    </div>
  );
}
