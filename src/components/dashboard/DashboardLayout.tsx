import { Sidebar } from "./Sidebar";
import { HomeView } from "./HomeView";
import { FloatingMicButton } from "./FloatingMicButton";

export const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-white w-full relative">
            <Sidebar />
            <HomeView />
            <FloatingMicButton />
        </div>
    );
};
