"use client";

import { useEffect, useState } from "react";
import { TaskItem } from "../TaskItem/TaskItem";
import { FilterButton } from "../FilterButton/FilterButton";
import { CreateTask } from "../CreateTask/CreateTask";
import { localStorageTasks } from "@/utils/localStorageTasks";

export interface Task {
    id: string;
    title: string;
    project: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    status: "open" | "completed" | "archived";
    participants: string[];
}

export const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filtrage des tâches selon leur statut.
    const filteredTasks = tasks.filter((task) => {
        if (filter === "All") return task.status !== "archived";
        if (filter === "Open") return task.status === "open";
        if (filter === "Closed") return task.status === "completed";
        if (filter === "Archived") return task.status === "archived";
        return true;
    });

    // Permet de changer le filtre actif.

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    // Récupération des tâches depuis le localStorage au chargement du composant.

    useEffect(() => {
        const savedTasks = localStorageTasks.getTasks();
        setTasks(savedTasks);
    }, []);

    return (
        <>
            <div className="flex-grow">
                <header className="flex justify-between items-center my-6 px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Todays Task</h1>
                        <span className="text-gray-400">{new Date().toDateString()}</span>
                    </div>
                    <button
                        className="bg-blue-100 text-primary px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-200"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Task
                    </button>
                </header>

                {/* Affichage des boutons de filtre */}
                <div className="grid grid-cols-2 md:flex gap-6 mb-6 px-8 justify-evenly">
                    <FilterButton
                        label={"All"}
                        count={tasks.length}
                        active={filter === "All"}
                        onClick={() => handleFilterChange("All")}
                    />
                    <span className="hidden md:block">|</span>
                    <FilterButton
                        label={"Open"}
                        count={tasks.filter((t) => t.status === "open").length}
                        active={filter === "Open"}
                        onClick={() => handleFilterChange("Open")}
                    />
                    <FilterButton
                        label={"Closed"}
                        count={tasks.filter((t) => t.status === "completed").length}
                        active={filter === "Closed"}
                        onClick={() => handleFilterChange("Closed")}
                    />
                    <FilterButton
                        label={"Archived"}
                        count={tasks.filter((t) => t.status === "archived").length}
                        active={filter === "Archived"}
                        onClick={() => handleFilterChange("Archived")}
                    />
                </div>

                {/* Liste des tâches filtrées */}
                <div className="space-y-4 px-8 pb-8">
                    {Array.isArray(filteredTasks) && filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="animate-fadeIn"
                            >
                                <TaskItem
                                    title={task.title}
                                    project={task.project}
                                    completed={task.status === "completed"}
                                    participants={task.participants}
                                    date={task.date}
                                    timeStart={task.timeStart}
                                    timeEnd={task.timeEnd}
                                    setTasks={setTasks}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-800 animate-fadeIn">No tasks found.</p>
                    )}
                </div>
            </div>

            {/* Modal pour créer une nouvelle tâche */}
            {isModalOpen && (
                <div className="animate-fadeIn">
                    <CreateTask
                        onClose={() => setIsModalOpen(false)}
                        setTasks={setTasks}
                    />
                </div>
            )}
        </>
    );
};

export default TaskList;
