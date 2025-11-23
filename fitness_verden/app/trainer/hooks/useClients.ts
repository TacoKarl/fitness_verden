import { useState } from "react";
import { parseJwt } from "@/app/lib/parseJwt";

export interface Client {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  personalTrainerId: number;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://assignment2.swafe.dk/api/Users/Clients",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }

      const data = await response.json();
      setClients(data);
    } catch (err: any) {
      console.error("Error fetching clients:", err);
      setError("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (clientData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      const payload = parseJwt(token || "");

      const response = await fetch("https://assignment2.swafe.dk/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          email: clientData.email,
          password: clientData.password,
          personalTrainerId: payload?.UserId || 0,
          accountType: "Client",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create client");
      }

      await fetchClients();
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "Failed to create client",
      };
    }
  };

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
  };
}
