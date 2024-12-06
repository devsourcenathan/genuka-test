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
            className={`flex items-center gap-2 ${active ? 'text-blue-500' : 'text-gray-400'
                }`}
        >
            {label}
            <span className={`px-2 py-0.5 rounded-full text-sm ${active ? 'bg-blue-100 text-blue-500' : 'bg-gray-100'
                }`}>
                {count}
            </span>
        </button>
    );
}; 