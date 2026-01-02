import {
    LayoutGrid,
    Book,
    Scissors,
    Type,
    FileText,
    Users,
    Gift,
    Settings,
    HelpCircle,
    AudioWaveform
} from "lucide-react";
import { cn } from "../../lib/utils";

export const Sidebar = () => {
    const navItems = [
        { icon: LayoutGrid, label: "Home", active: true },
        { icon: Book, label: "Dictionary", active: false },
        { icon: Scissors, label: "Snippets", active: false },
        { icon: Type, label: "Style", active: false },
        { icon: FileText, label: "Notes", active: false },
    ];

    const bottomItems = [
        { icon: Users, label: "Invite your team" },
        { icon: Gift, label: "Get a free month" },
        { icon: Settings, label: "Settings" },
        { icon: HelpCircle, label: "Help" },
    ];

    return (
        <div className="w-[280px] h-screen bg-white border-r border-gray-100 flex flex-col p-4 font-sans">
            {/* Header */}
            <div className="flex items-center gap-2 mb-8 px-2">
                <AudioWaveform className="w-6 h-6 text-black" />
                <span className="text-xl font-bold tracking-tight text-black">Flow</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold ml-2">
                    Pro Trial
                </span>
            </div>

            {/* Main Nav */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                            item.active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Promo Card */}


            {/* Bottom Nav */}
            <div className="space-y-1 pt-4 border-t border-gray-100">
                {bottomItems.map((item) => (
                    <button
                        key={item.label}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
