import { useState } from "react";
import { Mic, Globe, Settings, X, Copy, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { AudioVisualizer } from "./AudioVisualizer";
import { TranscriptView } from "./TranscriptView";

export type FlowState = "idle" | "recording" | "transcribing" | "result";

interface FlowWidgetProps {
    initialState?: FlowState;
}

export const FlowWidget = ({ initialState = "idle" }: FlowWidgetProps) => {
    const [state, setState] = useState<FlowState>(initialState);
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    // Mock interaction
    const toggleRecording = () => {
        if (state === "idle") {
            setState("recording");
            setText("");
        } else if (state === "recording") {
            setState("transcribing");
            setTimeout(() => {
                setText("This is a simulated transcription of what you just said. It flows nicely into the active window.");
                setState("result");
            }, 1500);
        } else {
            setState("idle");
            setText("");
        }
    };

    const copyText = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                className={cn(
                    "relative flex flex-col overflow-hidden bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ease-out",
                    state === "result" ? "rounded-2xl" : "rounded-[32px]"
                )}
            >
                {/* Main Bar */}
                <div className="h-16 flex items-center px-4 gap-4">
                    {/* Status / Action Button */}
                    <button
                        onClick={toggleRecording}
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                            state === "recording" ? "bg-red-500/20 text-red-500 scale-110" : "bg-white/10 text-white hover:bg-white/20"
                        )}
                    >
                        {state === "recording" ? (
                            <div className="w-3 h-3 bg-current rounded-sm" />
                        ) : (
                            <Mic className="w-5 h-5" />
                        )}
                    </button>

                    {/* Dynamic Content Area */}
                    <div className="flex-1 flex items-center min-w-[200px] h-full">
                        {state === "idle" && (
                            <span className="text-white/50 text-sm font-medium">Press Space to Speak</span>
                        )}

                        {state === "recording" && (
                            <div className="flex-1 flex justify-center">
                                <AudioVisualizer isRecording={true} />
                            </div>
                        )}

                        {state === "transcribing" && (
                            <span className="text-white/50 text-sm animate-pulse">Transcribing...</span>
                        )}

                        {(state === "result") && (
                            <div className="flex-1 flex justify-end gap-2">
                                <button
                                    onClick={copyText}
                                    className="p-2 text-white/50 hover:text-white transition-colors"
                                    title="Copy to Clipboard"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setState("idle")}
                                    className="p-2 text-white/50 hover:text-white transition-colors"
                                    title="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Settings / Decor */}
                    {state === "idle" && (
                        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                            <div className="w-2 h-2 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <span className="text-xs text-white/30 font-mono">FLOW</span>
                        </div>
                    )}
                </div>

                {/* Expanded Result View */}
                <div
                    className={cn(
                        "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                        state === "result" ? "max-h-[300px] opacity-100 border-t border-white/5" : "max-h-0 opacity-0"
                    )}
                >
                    <TranscriptView text={text} />
                </div>
            </div>
        </div>
    );
};
