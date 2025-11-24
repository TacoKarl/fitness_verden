import { useState } from "react";

export function useTrainers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createTrainer = async (trainerData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://assignment2.swafe.dk/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: trainerData.firstName,
          lastName: trainerData.lastName,
          email: trainerData.email,
          password: trainerData.password,
          personalTrainerId: 0,
          accountType: "PersonalTrainer",
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        console.log("Server response:", responseText);
        console.log("Response status:", response.status);

        try {
          const errorData = JSON.parse(responseText);
          throw new Error(
            errorData.message || "Failed to create personal trainer"
          );
        } catch (parseError) {
          throw new Error(
            `Server error (${response.status}): ${responseText.substring(0, 200)}...`
          );
        }
      }

      const responseText = await response.text();
      console.log("Success response:", responseText);

      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create personal trainer";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createTrainer,
  };
}
