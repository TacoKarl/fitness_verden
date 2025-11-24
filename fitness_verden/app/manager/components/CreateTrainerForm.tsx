import { useState } from "react";
import { useTrainers } from "../hooks/useTrainers";
import styles from "./CreateTrainerForm.module.css";

interface CreateTrainerFormProps {
  onSuccess?: () => void;
}

export function CreateTrainerForm({ onSuccess }: CreateTrainerFormProps) {
  const { createTrainer } = useTrainers();

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
      setError("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }

    const result = await createTrainer({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSuccess("Personal trainer created successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }
    } else {
      setError(result.error || "Failed to create personal trainer");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create New Personal Trainer</h2>

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
            placeholder="Confirm the password"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Creating..." : "Create Personal Trainer"}
        </button>
      </form>
    </div>
  );
}
