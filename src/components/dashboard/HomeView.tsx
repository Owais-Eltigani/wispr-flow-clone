import { Flame, Rocket, ThumbsUp, ArrowRight } from "lucide-react";
import { StatCard } from "./StatCard";
import { ActivityItem } from "./ActivityItem";

export const HomeView = () => {
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

                {/* Banner */}


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
                            <ActivityItem
                                time="05:49 PM"
                                content="Hello"
                            />
                            <ActivityItem
                                time="05:48 PM"
                                content="Yes, that's a nice idea. Please add it to my Notion list."
                            />
                            <ActivityItem
                                time="05:47 PM"
                                content={
                                    <div className="space-y-4">
                                        <p>Hello.</p>
                                        <p>Yeah, I think Wispr Flow is working fine.</p>
                                    </div>
                                }
                            />
                            <ActivityItem
                                time="05:47 PM"
                                content="Yes, it's working."
                            />
                        </div>
                    </div>
                </div>

                {/* Spacer for scroll */}
                <div className="h-20" />
            </div>
        </div>
    );
};
