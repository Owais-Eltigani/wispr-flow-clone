import { Flame, Rocket, ThumbsUp } from "lucide-react";
import { StatCard } from "./StatCard";
import { ActivityItem } from "./ActivityItem";
import { ReactNode } from "react";

interface HomeViewProps {
    activities: Array<{
        id: string;
        time: string;
        content: ReactNode;
    }>;
    onUpdateActivity: (id: string, newContent: string) => void;
}

export const HomeView = ({ activities, onUpdateActivity }: HomeViewProps) => {
    return (
        <div className="flex-1 h-screen overflow-y-auto bg-white">
            <div className="max-w-4xl mx-auto px-12 py-12">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, Whisperer</h1>
                    <div className="flex gap-3">
                        <StatCard icon={Flame} value="1 day" label="" color="text-orange-500" />
                        <StatCard icon={Rocket} value="25 words" label="" color="text-red-500" />
                        <StatCard icon={ThumbsUp} value="69 WPM" label="" color="text-yellow-500" />
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-3xl text-gray-800 italic">
                            Get back into your Flow
                        </h3>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 p-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        <div className="bg-gray-50/50 py-3 px-6 rounded-t-lg border-b border-gray-100 mb-2">
                            <span className="text-xs font-semibold text-gray-400 tracking-wider">TODAY</span>
                        </div>

                        <div className="px-6 pb-4 flex flex-col gap-2">
                            {activities.length === 0 ? (
                                <div className="text-gray-400 text-sm py-4 text-center italic">
                                    No transcriptions yet. Start speaking!
                                </div>
                            ) : (
                                activities.map((activity) => (
                                    <ActivityItem
                                        key={activity.id}
                                        id={activity.id}
                                        time={activity.time}
                                        content={activity.content}
                                        onUpdate={onUpdateActivity}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Spacer for scroll */}
                <div className="h-20" />
            </div>
        </div>
    );
};
