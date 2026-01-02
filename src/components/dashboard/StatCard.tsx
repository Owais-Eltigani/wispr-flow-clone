import { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    value: string;
    label: string;
    color: string;
}

export const StatCard = ({ icon: Icon, value, label, color }: StatCardProps) => {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-100 shadow-sm">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="text-sm font-medium text-gray-900">{value}</span>
            <span className="text-sm text-gray-500">{label}</span>
        </div>
    );
};
