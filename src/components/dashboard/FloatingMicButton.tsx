import { Mic } from "lucide-react";
import { cn } from "../../lib/utils";
import { AudioVisualizer } from "../flow/AudioVisualizer";
import { useDeepgram } from "../../hooks/useDeepgram";

interface FloatingMicButtonProps {
    onTranscription?: (text: string) => void;
}

export const FloatingMicButton = ({ onTranscription }: FloatingMicButtonProps) => {
    const { connect, disconnect, isListening } = useDeepgram((text) => {
        onTranscription?.(text);
    });

    const toggleRecording = async () => {
        if (isListening) {
            disconnect();
        } else {
            await connect();
        }
    };

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <button
                onClick={toggleRecording}
                className={cn(
                    "flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/50",
                    "shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.16)]",
                    isListening
                        ? "w-24 h-16 bg-white text-red-500 scale-110"
                        : "w-16 h-16 bg-gray-50 text-gray-600 hover:scale-110 hover:bg-white hover:text-black"
                )}
            >
                {isListening ? (
                    <AudioVisualizer isRecording={true} />
                ) : (
                    <Mic className="w-8 h-8" />
                )}
            </button>
        </div>
    );
};
