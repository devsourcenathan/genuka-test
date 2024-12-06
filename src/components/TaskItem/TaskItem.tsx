import { CheckIcon } from "../icons/CheckIcon";

interface TaskItemProps {
    title: string;
    project: string;
    time: string;
    completed: boolean;
    participants: string[];
}

export const TaskItem = ({
    title,
    project,
    time,
    completed,
    participants
}: TaskItemProps) => {
    return (
        <div className="bg-white rounded-xl p-6 flex flex-col justify-between items-center shadow-sm">
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h3 className={`text-lg font-bold text-gray-800 ${completed && 'line-through'}`}>{title}</h3>
                    <p className="text-gray-400">{project}</p>

                </div>

                <span className="bg-blue-500 text-white p-1 w-6 h-6 rounded-full">
                    {completed && <CheckIcon className="w-4 h-4" />}
                </span>
            </div>

            <div className="h-2  bg-gray-400 my-4"></div>

            <div className="w-full flex justify-between -space-x-2">
                <p className="text-gray-400">Today {time}</p>

                <div className="flex -ml-4">
                    {participants.slice(0, 3).map((avatar, index) => (
                        <img
                            key={index}
                            src={avatar}
                            alt="Participant avatar"
                            className="w-8 h-8 rounded-full border-2 border-white"
                        />
                    ))}
                    {participants.length > 3 && (
                        <div className="w-8 h-8 -ml-4 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-sm border-2 border-white">
                            +{participants.length - 3}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};