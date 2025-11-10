"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {JwtPayload, parseJwt} from "@/app/lib/parseJwt";

export default function HomePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        const payload = parseJwt(token);
        if (!payload || !payload.Role) {
            router.push("/login");
            return;
        }

        setUser(payload);
        setLoading(false);

    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }


    return (
        <div className="flex min-h-screen items-center justify-center">
            <main className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Velkommen til Fitness Verden</h1>
                {user?.Role === "Manager" && <p>Manager Dashboard</p>}
                {user?.Role === "PersonalTrainer" && <p>Trainer Dashboard</p>}
                {user?.Role === "Client" && <p>Client Dashboard</p>}
            </main>
        </div>
    );
}
