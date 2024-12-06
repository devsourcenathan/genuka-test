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

const TASKS_STORAGE_KEY = "tasks";

export const localStorageTasks = {
    // Récupère toutes les tâches
    getTasks(): Task[] {
        const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
        return tasks ? JSON.parse(tasks) : [];
    },

    // Sauvegarde une liste de tâches
    saveTasks(tasks: Task[]): void {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    },

    // Ajoute une nouvelle tâche
    addTask(newTask: Task): void {
        const tasks = this.getTasks();
        tasks.push(newTask);
        this.saveTasks(tasks);
    },


    // Met à jour une tâche par son ID
    updateTask(updatedTask: Task): void {
        const tasks = this.getTasks();
        const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task
        );
        this.saveTasks(updatedTasks);
    },
};
