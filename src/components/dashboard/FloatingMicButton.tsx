import { Mic } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { AudioVisualizer } from "../flow/AudioVisualizer";

export const FloatingMicButton = () => {
    const [isRecording, setIsRecording] = useState(false);

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <button
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                    "flex items-center justify-center rounded-[100%] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/50",
                    "shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.16)]",
                    isRecording
                        ? "w-24 h-16 bg-white text-red-500 scale-110"
                        : "w-16 h-16 bg-gray-50 text-gray-600 hover:scale-110 hover:bg-white hover:text-black"
                )}
            >
                {isRecording ? (
                    <AudioVisualizer isRecording={true} />
                ) : (
                    <Mic className="w-8 h-8" />
                )}
            </button>
        </div>
    );
};
