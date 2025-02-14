import { useState, useCallback, useEffect } from "react";

interface AudioRecordingHook {
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  isRecording: boolean;
  isPaused: boolean;
  error: string | null;
  audioData: Blob | null;
}

interface AudioRecordingProps {
  onVerseReceived: (verse: { reference: string; text: string }) => void;
}

export const useAudioRecording = ({
  onVerseReceived,
}: AudioRecordingProps): AudioRecordingHook => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioData] = useState<Blob | null>(null);

  const PAUSED = "paused";
  const RECORDING = "recording";
  const INACTIVE = "inactive";

  // Internal cleanup function
  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== INACTIVE) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setMediaRecorder(null);
      setIsRecording(false);
      setIsPaused(false);
    }

    if (ws) {
      ws.close();
      setWs(null);
    }
  }, [mediaRecorder, ws]);

  // Cleanup on unmount or error
  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        stopRecording();
      }
    };
  }, [mediaRecorder, stopRecording]);

  const startRecording = async () => {
    try {
      if (ws && ws.readyState === WebSocket.OPEN) {
        console.warn("WebSocket already open, reusing connection.");
        return;
      }

      const socket = new WebSocket(import.meta.env.VITE_WS_URL);

      socket.onopen = () => {
        console.log("WebSocket connected");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received from server:", data);

        if (data.type === "bible_reference") {
          onVerseReceived?.(data.verse);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("WebSocket connection failed");
      };

      socket.onclose = () => {
        console.warn("WebSocket closed. Attempting to reconnect...");
        setWs(null);
      };

      // First check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Audio recording is not supported on this device/browser");
        console.error(
          "Audio recording is not supported on this device/browser"
        );
        return;
      }

      // Get audio stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Send audio chunk to server
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          } else {
            console.warn("WebSocket not open, dropping audio chunk");
          }
        }
      };

      setWs(socket);
      setMediaRecorder(recorder);
      recorder.start(100);
      setIsRecording(true);
      setIsPaused(false);
      setError(null);
    } catch (err) {
      setError("Microphone or connection error");
      console.error("Error:", err);
    }
  };

  // Clean up WebSocket on unmount
  useEffect(() => {
    return () => {
      if (ws) {
        ws.onclose = null;
        ws.onerror = null;
        ws.close();
      }
    };
  }, [ws]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state === RECORDING) {
      mediaRecorder.pause();
      setIsPaused(true);
    }
  }, [mediaRecorder]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state === PAUSED) {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  }, [mediaRecorder]);

  return {
    startRecording,
    pauseRecording,
    resumeRecording,
    isRecording,
    isPaused,
    error,
    audioData,
  };
};
