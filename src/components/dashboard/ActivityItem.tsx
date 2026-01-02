import { useState, useRef, useEffect } from "react";
import { Copy, Share2, Check, X } from "lucide-react";

interface ActivityItemProps {
    id: string;
    time: string;
    content: React.ReactNode;
    onUpdate: (id: string, newContent: string) => void;
}

export const ActivityItem = ({ id, time, content, onUpdate }: ActivityItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState("");
    const [hasCopied, setHasCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Initialize edit value when content changes (if it's a string)
    useEffect(() => {
        if (typeof content === "string") {
            setEditValue(content);
        }
    }, [content]);

    // Auto-focus and resize textarea when entering edit mode
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editValue.trim()) {
            onUpdate(id, editValue);
        }
        setIsEditing(false);
    };

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof content === "string") {
            try {
                await navigator.clipboard.writeText(content);
                setHasCopied(true);
                setTimeout(() => setHasCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy", err);
            }
        }
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof content === "string") {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Wispr Flow Transcript',
                        text: content,
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                // Fallback for desktop/unsupported browsers
                console.log("Web Share API not supported");
                // Could act as a secondary copy or show a modal
                await navigator.clipboard.writeText(content);
                alert("Text copied to clipboard (Share not supported locally)");
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        }
        if (e.key === "Escape") {
            setIsEditing(false);
            if (typeof content === "string") setEditValue(content);
        }
    };

    return (
        <div
            className="flex gap-8 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-4 -mx-4 rounded-lg group relative"
            onClick={() => !isEditing && setIsEditing(true)}
        >
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap pt-1 font-mono">
                {time}
            </span>

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            value={editValue}
                            onChange={(e) => {
                                setEditValue(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height = e.target.scrollHeight + "px";
                            }}
                            onBlur={handleSave}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-white border border-blue-200 rounded p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none overflow-hidden"
                            rows={1}
                        />
                        <div className="absolute right-2 bottom-2 flex gap-1">
                            <button
                                onMouseDown={(e) => { e.preventDefault(); handleSave(); }} // onMouseDown prevents blur before click
                                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                <Check className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-wrap break-words">
                        {content}
                    </div>
                )}
            </div>

            {/* Actions overlay - visible on hover, hidden while editing */}
            {!isEditing && (
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm p-1 rounded-md shadow-sm border border-gray-100">
                    <button
                        onClick={handleCopy}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        title="Copy to clipboard"
                    >
                        {hasCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={handleShare}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        title="Share"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};
