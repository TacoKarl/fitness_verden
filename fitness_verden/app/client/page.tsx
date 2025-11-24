"use client"

import {useEffect, useState} from "react";
import styles from "@/app/client/client.module.css";
import {JwtPayload, parseJwt} from "@/app/lib/parseJwt";
import {useRouter} from "next/navigation";
import Logout from "../login/logout";
import {useWorkoutPrograms} from "@/app/api/hooks/useWorkoutPrograms";

export default function ClientPage() {
    const router = useRouter();
    const [user, setUser] = useState<JwtPayload | null>(null);
    const [loading, setLoading] = useState(true);

    const { programs, fetchWorkoutPrograms } = useWorkoutPrograms();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }
        const payload = parseJwt(token);
        if (!payload || payload.Role !== "Client") {
            router.push("/login");
            return;
        }

        setUser(payload);
        setLoading(false);

        fetchWorkoutPrograms();

    }, [router]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <p className={styles.loadingText}>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div>
                <Logout></Logout>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Client Dashboard</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300">Welcome back {user?.Name}</p>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Your Workout Programs:</h2>

                    { programs.length === 0 &&
                        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                        No Workout Programs has been assigned to you yet. Please contact your personal trainer.
                        </p>
                    }

                    <ul className="w-full max-w-3xl space-y-6">
                        {programs.map((program) => (
                            <li key={program.name}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                                onClick={() => router.push(`/client/program/${program.workoutProgramId}`)}
                            >
                                <strong
                                    className="text-2xl font-bold mb-2 text-gray-900 dark:text-white"
                                >
                                    {program.name}
                                </strong><br />
                                <p className="mb-4 text-gray-700 dark:text-gray-300">
                                    {program.description}
                                </p>

                                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    Exercises:
                                </h4>
                                {program.exercises.length === 0 && (
                                    <div className="mt-2">
                                        <p className="mb-2 text-gray-700 dark:text-gray-300">No exercises found in this program, that's weird. Have this duck:</p>
                                        <pre className="font-mono text-lg mt-2 inline-block">
{`
           __
       <(o )___
        ( ._> /
         \\/_/
`}
        </pre>
                                    </div>
                                )}
                                <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                                    {program.exercises.map((exercise) => (
                                        <li key={exercise.name} className="mb-1 font-medium">
                                            {exercise.name}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}