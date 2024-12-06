"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Task } from "../TaskList/TaskList";
import { localStorageTasks } from "@/utils/localStorageTasks";

interface FilterButtonProps {
    onClose: () => void;
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const CreateTask = ({ onClose, setTasks }: FilterButtonProps) => {
    const [newTask, setNewTask] = useState({
        title: "",
        project: "",
        date: new Date().toISOString().split("T")[0], // Initialise avec la date du jour
        timeStart: "",
        timeEnd: "",
        status: "open" as const,
        participants: [] as string[],
    });

    const [participantName, setParticipantName] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Fonction de validation
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!newTask.title.trim()) {
            newErrors.title = "Title is required.";
        }
        if (!newTask.project.trim()) {
            newErrors.project = "Project is required.";
        }
        if (!newTask.date) {
            newErrors.date = "Date is required.";
        }
        if (!newTask.timeStart) {
            newErrors.timeStart = "Start time is required.";
        }
        if (!newTask.timeEnd) {
            newErrors.timeEnd = "End time is required.";
        } else if (newTask.timeStart >= newTask.timeEnd) {
            newErrors.timeEnd = "End time must be after start time.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retourne `true` si aucune erreur
    };

    const handleAddParticipant = () => {
        if (participantName.trim()) {
            setNewTask({
                ...newTask,
                participants: [...newTask.participants, participantName.trim()],
            });
            setParticipantName("");
        }
    };

    const handleRemoveParticipant = (index: number) => {
        setNewTask({
            ...newTask,
            participants: newTask.participants.filter((_, i) => i !== index),
        });
    };

    const handleAddTask = () => {
        if (validate()) {
            setTasks((tasks) => [...tasks, { ...newTask, id: Date.now().toString() }]);
            localStorageTasks.addTask({ ...newTask, id: Date.now().toString() });
            onClose();
            setNewTask({
                title: "",
                project: "",
                date: new Date().toISOString().split("T")[0], // Réinitialise avec la date du jour
                timeStart: "",
                timeEnd: "",
                status: "open",
                participants: [],
            });
            setErrors({});
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add New Task</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className={`border p-2 mb-3 w-full rounded ${errors.title ? "border-red-500" : ""}`}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

                <input
                    type="text"
                    placeholder="Project"
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                    className={`border p-2 mb-3 w-full rounded ${errors.project ? "border-red-500" : ""}`}
                />
                {errors.project && <p className="text-red-500 text-sm">{errors.project}</p>}

                <input
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    className={`border p-2 mb-3 w-full rounded ${errors.date ? "border-red-500" : ""}`}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

                <div className="flex gap-2 mb-3">
                    <input
                        type="time"
                        value={newTask.timeStart}
                        onChange={(e) => setNewTask({ ...newTask, timeStart: e.target.value })}
                        className={`border p-2 flex-1 rounded ${errors.timeStart ? "border-red-500" : ""}`}
                    />

                    <input
                        type="time"
                        value={newTask.timeEnd}
                        onChange={(e) => setNewTask({ ...newTask, timeEnd: e.target.value })}
                        className={`border p-2 flex-1 rounded ${errors.timeEnd ? "border-red-500" : ""}`}
                    />
                </div>
                {errors.timeStart && <p className="text-red-500 text-sm">{errors.timeStart}</p>}
                {errors.timeEnd && <p className="text-red-500 text-sm">{errors.timeEnd}</p>}

                <div className="mb-3">
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Add participant"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                            className="border p-2 flex-grow rounded"
                        />
                        <button
                            onClick={handleAddParticipant}
                            className="bg-blue-100 text-blue-600 px-3 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>

                    <div className="space-y-2">
                        {newTask.participants.map((participant, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center bg-gray-50 p-2 rounded"
                            >
                                <span>{participant}</span>
                                <button
                                    onClick={() => handleRemoveParticipant(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={handleAddTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};
