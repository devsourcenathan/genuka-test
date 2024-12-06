import { Dispatch, SetStateAction } from "react";
import { CheckIcon } from "../icons/CheckIcon";
import { Task } from "../TaskList/TaskList";
import { getFormattedDate } from "@/utils";
import Image from 'next/image'
import { localStorageTasks } from "@/utils/localStorageTasks";
interface TaskItemProps {
    title: string;
    project: string;
    completed: boolean;
    participants: string[];
    setTasks: Dispatch<SetStateAction<Task[]>>
    date: string;
    timeStart: string
    timeEnd: string
}

export const TaskItem = ({
    title,
    project,
    completed,
    date,
    timeStart,
    timeEnd,
    participants,
    setTasks
}: TaskItemProps) => {

    const handleToggleTaskCompletion = () => {
        setTasks((tasks) => {
            const updatedTasks = tasks.map((task) => {
                if (task.title === title) {
                    return {
                        ...task,
                        status: task.status === "completed" ? "open" : "completed" as "open" | "completed",
                    };
                }
                return task;
            });
            localStorageTasks.saveTasks(updatedTasks); // Sauvegarder dans le localStorage
            return updatedTasks;
        });
    }

    return (

        <div onClick={() => handleToggleTaskCompletion()} className="bg-white rounded-xl p-6 flex flex-col justify-between items-center shadow-sm cursor-pointer">
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h3 className={`text-lg font-bold text-gray-800 ${completed && 'line-through'}`}>{title}</h3>
                    <p className="text-gray-400">{project}</p>

                </div>

                <span className={`${completed ? 'bg-primary' : 'bg-white border-2 border-gray'} text-white p-1 w-6 h-6 rounded-full`}>
                    {completed && <CheckIcon className="w-4 h-4" />}
                </span>
            </div>

            <div className="h-2  bg-gray-400 my-4"></div>

            <div className="w-full flex justify-between -space-x-2">
                <p className="text-gray-400">{getFormattedDate(date, timeStart, timeEnd)}</p>

                <div className="flex">
                    {participants.slice(0, 3).map((avatar, index) => (
                        <Image
                            width={80}
                            height={80}
                            key={index}
                            src={"https://i.pravatar.cc/300"}
                            alt={avatar}
                            className={`${participants?.length > 1 ? "w-8" : "w-10"} h-8  -ml-3 rounded-full border-2 border-white`}
                        />
                    ))}
                    {participants.length > 3 && (
                        <div className="w-8 h-8 -ml-3 rounded-full bg-blue-100 text-primary flex items-center justify-center text-sm border-2 border-white">
                            +{participants.length - 3}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};