export function WorkoutProgramsPlaceholder() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Workout Programs
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        🚧 This section is ready for you to build!
      </p>
      <div className="text-left max-w-2xl mx-auto space-y-4 text-sm text-gray-500">
        <p>
          💡{" "}
          <strong>
            To build this feature, follow the same pattern as clients:
          </strong>
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Create{" "}
            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              useWorkoutPrograms.ts
            </code>{" "}
            hook
          </li>
          <li>
            Create{" "}
            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              WorkoutProgramsList.tsx
            </code>{" "}
            component
          </li>
          <li>
            Create{" "}
            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              CreateProgramForm.tsx
            </code>{" "}
            component
          </li>
          <li>Add to tab navigation in page.tsx</li>
        </ol>
        <p className="mt-4">
          📚 <strong>APIs you'll need:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>GET /api/WorkoutPrograms - List programs</li>
          <li>POST /api/WorkoutPrograms - Create program</li>
          <li>GET /api/WorkoutPrograms/{`{id}`} - View specific program</li>
          <li>POST /api/Exercises/Program/{`{programId}`} - Add exercises</li>
        </ul>
      </div>
    </div>
  );
}
