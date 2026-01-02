import { Sidebar } from "./Sidebar";
import { HomeView } from "./HomeView";

export const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-white w-full">
            <Sidebar />
            <HomeView />
        </div>
    );
};
