
interface ActivityItemProps {
    time: string;
    content: React.ReactNode;
}

export const ActivityItem = ({ time, content }: ActivityItemProps) => {
    return (
        <div className="flex gap-8 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-4 -mx-4 rounded-lg group">
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap pt-1 font-mono">
                {time}
            </span>
            <div className="text-sm text-gray-700 leading-relaxed font-medium">
                {content}
            </div>
        </div>
    );
};
