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

export const useAudioRecording = (): AudioRecordingHook => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioData, setAudioData] = useState<Blob | null>(null);

  const PAUSED = "paused";
  const RECORDING = "recording";
  const INACTIVE = "inactive";

  // Internal cleanup function
  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== INACTIVE) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setIsPaused(false);
    }
  }, [mediaRecorder]);

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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      console.log(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioData(event.data);
          console.log(event.data);
        }
      };

      setMediaRecorder(recorder);
      recorder.start(100);
      setIsRecording(true);
      setIsPaused(false);
      setError(null);
      console.log(recorder);
    } catch (err) {
      setError("Microphone permission denied");
      console.error("Error accessing microphone:", err);
    }
  };

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
