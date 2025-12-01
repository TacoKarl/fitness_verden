"use client";

import {WorkoutProgram} from "@/app/api/hooks/useWorkoutPrograms";
import {Exercise} from "@/app/api/hooks/useExercises";
import {useEffect, useState} from "react";
import {JwtPayload, parseJwt} from "@/app/lib/parseJwt";

interface AddExerciseModalProps {
    programId: string;
    program: WorkoutProgram;
    availableExercises: Exercise[];
    onClose: () => void;
    onExerciseAdded: (exercise: Exercise) => void;
}

interface NewExercise {
    name: string;
    sets: number;
    repetitions: number;
    description: string;
    time: string;
}
export default function AddExerciseModal ({
                                              programId,
                                              program,
                                              availableExercises,
                                              onClose,
                                              onExerciseAdded,
                                          } : AddExerciseModalProps) {
    const [newExercise, setNewExercise] = useState<NewExercise>({
        name: "",
        sets: 0,
        repetitions: 0,
        description: "",
        time: "",
    });
    const [user, setUser] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = parseJwt(token);
        setUser(payload);
    }, []);

    const handleCreateAndAddExercise = async () => {
        if (!user) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(
                `https://assignment2.swafe.dk/api/Exercises/Program/${programId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...newExercise,
                        personalTrainerId: user.UserId,
                    }),
                }
            );

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Failed to add exercise:", errorText);
                return;
            }

            const createdExercise: Exercise = await res.json();

            onExerciseAdded(createdExercise);

            setNewExercise({ name: "", sets: 0, repetitions: 0, description: "", time: "" });
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Add Exercise
                </h2>

                <input
                    type="text"
                    placeholder="Exercise name"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Sets"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: +e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={newExercise.repetitions}
                    onChange={(e) => setNewExercise({ ...newExercise, repetitions: +e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={newExercise.description}
                    onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Time"
                    value={newExercise.time}
                    onChange={(e) => setNewExercise({ ...newExercise, time: e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                />

                <div className="flex gap-2 mt-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={handleCreateAndAddExercise}
                    >
                        Create & Add
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}