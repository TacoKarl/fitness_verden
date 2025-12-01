"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {JwtPayload, parseJwt} from "@/app/lib/parseJwt";
import {WorkoutProgram} from "@/app/api/hooks/useWorkoutPrograms";
import Logout from "@/app/login/logout";
import {Exercise} from "@/app/api/hooks/useExercises";
import AddExerciseModal from "@/app/modal/addExercise/page";

export default function ProgramPage() {
    const router = useRouter();
    const params = useParams();
    const [user, setUser] = useState<JwtPayload | null>(null);
    const [program, setProgram] = useState<WorkoutProgram | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);

    const programId = params.id;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const payload = parseJwt(token);
        if (!payload) {
            router.push("/login");
            return;
        }
        setUser(payload);

        fetch(`https://assignment2.swafe.dk/api/WorkoutPrograms/${programId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) =>
                setProgram({
                    ...data,
                    exercises: data.exercises || [],
                })
            )
            .finally(() => setLoading(false));
    }, [programId, router]);



    if (loading) return <p>Loading...</p>;
    if (!program) return <p>Program not found.</p>;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{program.name}</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">{program.description}</p>
            </div>
            <Logout></Logout>
            <div className="w-full max-w-3xl space-y-6 rounded-xl bg-gray-800 mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center ">Exercises:</h2>

                {user?.Role === "PersonalTrainer" &&
                    <div className="flex gap-4 justify-center mt-6">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={async () => {
                            setIsModalOpen(true);
                            const token = localStorage.getItem("token");
                            const res = await fetch(`https://assignment2.swafe.dk/api/Exercises`, { headers: { Authorization: `Bearer ${token}` } });
                            const data = await res.json();
                            setAvailableExercises(data);
                        }}>
                            + Add Exercise
                        </button>
                    </div>
                 }

                {isModalOpen && (
                    <AddExerciseModal
                    programId={programId}
                    program={program}
                    availableExercises={availableExercises}
                    onClose={() => setIsModalOpen(false)}
                    onExerciseAdded={(ex) => setProgram(prev => prev ? { ...prev, exercises: [ ...prev.exercises, ex]} : prev)}
                    />
                )}

                {program.exercises.length === 0 ? (
                    <div className="text-center mt-2">
                        <p>No exercises found in this program. Have this duck:</p>
                        <pre className="font-mono text-lg mt-2 inline-block">
    {`
               __
           <(o )___
            ( ._> /
             \\/_/
    `}
              </pre>
                    </div>
                ) : (
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-center">
                        {program.exercises.map((ex, index) => (
                            <li key={`${ex.exerciseId}-${index}`} className="mb-1 font-medium">
                                {ex.name} — {ex.sets} sets × {ex.repetitions} reps, Time: {ex.time}<br/>
                                <strong>How to:</strong> {ex.description} <br/>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
