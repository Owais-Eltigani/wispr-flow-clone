import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { useState, useRef, useCallback } from "react";

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;

export interface DeepgramService {
    connect: () => Promise<void>;
    disconnect: () => void;
    isListening: boolean;
    transcript: string;
    error: string | null;
}

export const useDeepgram = (onTranscript?: (text: string) => void): DeepgramService => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState<string | null>(null);

    const deepgramRef = useRef<any>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const connect = useCallback(async () => {
        try {
            console.log("Connecting to Deepgram...");
            console.log("isSecureContext:", window.isSecureContext);
            console.log("navigator:", navigator);
            console.log("navigator.mediaDevices:", navigator.mediaDevices);

            if (!DEEPGRAM_API_KEY) {
                console.error("Deepgram API Key is missing in VITE_DEEPGRAM_API_KEY");
                throw new Error("Deepgram API Key is missing");
            }
            console.log("API Key found (length):", DEEPGRAM_API_KEY.length);

            console.log("Requesting microphone access...");
            if (!navigator.mediaDevices) {
                console.error("navigator.mediaDevices is undefined!");
                console.error("isSecureContext:", window.isSecureContext);
                console.error("This commonly happens if:");
                console.error("1. The app is not running in a secure context (https or localhost)");
                console.error("2. Microphone permissions are blocked in Tauri config");
                throw new Error("navigator.mediaDevices is not available");
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Microphone access granted:", stream.id);
            streamRef.current = stream;

            const deepgram = createClient(DEEPGRAM_API_KEY);

            console.log("Initializing Deepgram Live Client...");
            const connection = deepgram.listen.live({
                model: "nova-2",
                smart_format: true,
                interim_results: true,
                language: "en-US",
            });

            connection.on(LiveTranscriptionEvents.Open, () => {
                console.log("Deepgram WebSocket OPEN");
                setIsListening(true);
                setError(null);

                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: "audio/webm",
                });

                mediaRecorder.addEventListener("dataavailable", (event) => {
                    if (event.data.size > 0 && connection.getReadyState() === 1) {
                        connection.send(event.data);
                    }
                });

                mediaRecorder.start(250); // Send chunk every 250ms
                console.log("MediaRecorder started");
                mediaRecorderRef.current = mediaRecorder;
            });

            connection.on(LiveTranscriptionEvents.Transcript, (data) => {
                console.log("Deepgram Raw Event:", data); // Log full object
                const sentence = data.channel.alternatives[0]?.transcript;

                if (sentence) {
                    if (data.is_final) {
                        console.log("✅ Final Transcript:", sentence);
                        onTranscript?.(sentence);
                        setTranscript(""); // Clear preview
                    } else {
                        console.log("📝 Partial Transcript:", sentence);
                        setTranscript(sentence);
                    }
                }
            });

            connection.on(LiveTranscriptionEvents.Close, () => {
                console.log("Deepgram WebSocket CLOSED");
                setIsListening(false);
            });

            connection.on(LiveTranscriptionEvents.Error, (err) => {
                console.error("Deepgram Error:", err);
                setError("Connection error");
                setIsListening(false);
            });

            deepgramRef.current = connection;

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to connect microphone");
            setIsListening(false);
        }
    }, [onTranscript]);

    const disconnect = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        if (deepgramRef.current) {
            deepgramRef.current.finish();
            deepgramRef.current = null;
        }

        setIsListening(false);
    }, []);

    return {
        connect,
        disconnect,
        isListening,
        transcript,
        error,
    };
};
