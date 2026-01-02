import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export const AudioVisualizer = ({ isRecording }: { isRecording: boolean }) => {
    return (
        <div className="flex items-center justify-center gap-1 h-8">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "w-1 rounded-full bg-red-500 transition-all duration-150",
                        isRecording ? "animate-pulse" : "h-1 opacity-50"
                    )}
                    style={{
                        height: isRecording ? `${Math.random() * 16 + 8}px` : "4px",
                        animationDelay: `${i * 0.1}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default AudioVisualizer;
