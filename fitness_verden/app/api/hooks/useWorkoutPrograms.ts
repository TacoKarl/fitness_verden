import { useState } from "react";
import { parseJwt } from "@/app/lib/parseJwt";
import {Exercise} from "@/app/api/hooks/useExercises";



export interface WorkoutProgram {
  workoutProgramId: number;
  groupId: string;
  name: string;
  description: string;
  exercises: Exercise[];
  personalTrainerId: number;
  clientId: number;
}

export function useWorkoutPrograms() {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //See a list of workout programs.
  const fetchWorkoutPrograms = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://assignment2.swafe.dk/api/WorkoutPrograms",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch workout programs");
      }
      const data = await response.json();
      setPrograms(data);
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const createWorkoutProgram = async (workoutProgramData: {
    name: string;
    description: string;
    clientId: number;
  }) => {
    try {
      const token = localStorage.getItem("token");
      const payload = parseJwt(token || "");

      const response = await fetch(
        "https://assignment2.swafe.dk/api/WorkoutPrograms",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: workoutProgramData.name,
            description: workoutProgramData.description,
            exercises: [],
            personalTrainerId: payload?.UserId || 0,
            clientId: workoutProgramData.clientId,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create client");
      }

      await fetchWorkoutPrograms();
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "Failed to create client",
      };
    }
  };

  const fetchProgramById = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://assignment2.swafe.dk/api/WorkoutPrograms/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch program");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      setError(error.message || "An error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    programs,
    loading,
    error,
    fetchWorkoutPrograms,
    createWorkoutProgram,
    fetchProgramById,
  };
}
