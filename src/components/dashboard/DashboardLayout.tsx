import { Sidebar } from "./Sidebar";
import { HomeView } from "./HomeView";
import { FloatingMicButton } from "./FloatingMicButton";
import { useState } from "react";

export interface Activity {
  id: string;
  time: string;
  content: React.ReactNode;
}

export const DashboardLayout = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      content:
        "Draft: Welcome to Wispr Flow. This is your first transcription.",
    },
  ]);

  const handleTranscription = (text: string) => {
    if (!text.trim()) return;

    console.log("🎉 UI Received Transcript for Activity Feed:", text);

    setActivities((prev) => [
      {
        id: Date.now().toString(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: text,
      },
      ...prev,
    ]);
  };

  const handleUpdateActivity = (id: string, newContent: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, content: newContent } : activity
      )
    );
  };

  return (
    <div className="flex h-screen bg-white w-full relative">
      <Sidebar />
      <HomeView
        activities={activities}
        onUpdateActivity={handleUpdateActivity}
      />
      <FloatingMicButton onTranscription={handleTranscription} />
    </div>
  );
};
