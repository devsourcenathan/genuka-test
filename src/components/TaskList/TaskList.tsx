"use client"

import { useState } from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import { FilterButton } from "../FilterButton/FilterButton";

interface Task {
    id: string;
    title: string;
    project: string;
    time: string;
    status: 'open' | 'completed' | 'archived';
    participants: string[];
}

export const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "1",
            title: "Client Review & Feedback",
            project: "Crypto Wallet Redesign",
            time: "10:00 AM - 11:00 AM",
            status: 'completed',
            participants: ["John Doe", "Jane Smith"]
        },
        {
            id: "2",
            title: "Create Wireframe",
            project: "Crypto Wallet Redesign",
            time: "09:15 PM - 10:00 PM",
            status: 'open',
            participants: ["Bob Johnson", "Emily Davis", "Mike Wilson"]
        },
        {
            id: "3",
            title: "Review with Client",
            project: "Product Team",
            time: "01:00 PM - 03:00 PM",
            status: 'open',
            participants: ["Sarah Lee", "Alex Chen", "Olivia Patel"]
        },
        {
            id: "4",
            title: "Ideation",
            project: "Product Team",
            time: "02:00 PM - 04:00 PM",
            status: 'open',
            participants: ["David Kim", "Sophia Reyes", "Ethan Gonzalez"]
        }
    ]);

    const [filter, setFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        project: "",
        time: "",
        status: "open" as const,
        participants: [] as string[]
    });
    const [participantName, setParticipantName] = useState("");

    const filteredTasks = tasks.filter(task => {
        if (filter === "All") return task.status !== 'archived';
        if (filter === "Open") return task.status === 'open';
        if (filter === "Closed") return task.status === 'completed';
        if (filter === "Archived") return task.status === 'archived';
        return true;
    });

    const handleAddParticipant = () => {
        if (participantName.trim()) {
            setNewTask({
                ...newTask,
                participants: [...newTask.participants, participantName.trim()]
            });
            setParticipantName("");
        }
    };

    const handleRemoveParticipant = (index: number) => {
        setNewTask({
            ...newTask,
            participants: newTask.participants.filter((_, i) => i !== index)
        });
    };

    const handleAddTask = () => {
        if (newTask.title && newTask.project && newTask.time) {
            setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
            setIsModalOpen(false);
            setNewTask({
                title: "",
                project: "",
                time: "",
                status: "open",
                participants: []
            });
        }
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <nav className="flex gap-8 pb-4 border-b border-gray-200 bg-white p-8">
                <span className="text-gray-400">Messages</span>
                <span className="border-b-2 border-black text-gray-900 font-bold">Todays Task</span>
                <span className="text-gray-400">Last Activity</span>
            </nav>

            <div className="flex-grow">
                <header className="flex justify-between items-center my-6 px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Todays Task</h1>
                        <span className="text-gray-400">Wednesday, 11 May</span>
                    </div>
                    <button
                        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Task
                    </button>
                </header>

                <div className="flex gap-6 mb-6 px-8">
                    <FilterButton
                        label={"All"}
                        count={tasks.length}
                        active={filter === "All"}
                        onClick={() => handleFilterChange("All")}
                    />
                    <FilterButton
                        label={"Open"}
                        count={tasks.filter(t => t.status === 'open').length}
                        active={filter === "Open"}
                        onClick={() => handleFilterChange("Open")}
                    />
                    <FilterButton
                        label={"Closed"}
                        count={tasks.filter(t => t.status === 'completed').length}
                        active={filter === "Closed"}
                        onClick={() => handleFilterChange("Closed")}
                    />
                    <FilterButton
                        label={"Archived"}
                        count={tasks.filter(t => t.status === 'archived').length}
                        active={filter === "Archived"}
                        onClick={() => handleFilterChange("Archived")}
                    />
                </div>

                <div className="space-y-4 px-8 pb-8">
                    {filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            title={task.title}
                            project={task.project}
                            time={task.time}
                            completed={task.status === 'completed'}
                            participants={task.participants}
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Add New Task</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
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
                            className="border p-2 mb-3 w-full rounded"
                        />

                        <input
                            type="text"
                            placeholder="Project"
                            value={newTask.project}
                            onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                            className="border p-2 mb-3 w-full rounded"
                        />

                        <select
                            value={newTask.time}
                            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                            className="border p-2 mb-3 w-full rounded"
                        >
                            <option value="">Select Time</option>
                            <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                            <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                            <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                            <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                        </select>

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
                                onClick={() => setIsModalOpen(false)}
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
            )}
        </div>
    );
};

export default TaskList;