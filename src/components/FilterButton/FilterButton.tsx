interface FilterButtonProps {
    label: string;
    count: number;
    active?: boolean;
    onClick: () => void;
}

export const FilterButton = ({ label, count, active, onClick }: FilterButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-0.5 ${active ? 'text-primary' : 'text-gray-400'
                }  transition-transform transform hover:scale-105 hover:text-primary`}
        >
            {label}
            <span className={`px-2 py-0.5 rounded-full text-sm text-white ${active ? 'bg-primary ' : 'bg-gray-100'
                }`}>
                {count}
            </span>
        </button>
    );
}; 