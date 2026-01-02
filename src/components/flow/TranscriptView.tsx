import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

interface TranscriptViewProps {
    text: string;
    isProcessing?: boolean;
}

export const TranscriptView = ({ text, isProcessing }: TranscriptViewProps) => {
    return (
        <div className="flex flex-col gap-2 p-4 min-w-[300px] max-w-[500px]">
            <div className={cn("text-lg font-medium text-white/90 leading-relaxed", !text && "italic text-white/40")}>
                {text || "Listening..."}
            </div>
            {isProcessing && (
                <div className="flex items-center gap-2 text-xs text-white/50">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Processing...</span>
                </div>
            )}
        </div>
    );
};
