import { useState, useEffect } from "react";
import ListenButton from "./ListenButton";
import controlStyles from "../css/Controls.module.css";
import Icons from "./Icons";

interface ControlsProps {
  onTranscript: (text: string) => void;
  isProcessing: boolean;
}

const Controls = ({ onTranscript, isProcessing }: ControlsProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const getStatusMessage = () => {
    if (isProcessing) return "Processing audio...";
    if (isListening && !isPaused) return "Transcribing and detecting\nBible quotations in real time.";
    if (isPaused) return "Recording paused";
    return "Ready to detect Bible quotations";
  };

  const getStatusIcon = () => {
    if (isProcessing) return <Icons.AudioLines />;
    if (!isListening) return <Icons.Analytics />;
    if (isListening && !isPaused) return <Icons.AudioLines />;
    return <Icons.Pause />;
  };

  const handleListening = () => {
    if (isProcessing) return; // Prevent state changes while processing

    if (!isListening) {
      setIsListening(true);
      setIsPaused(false);
      onTranscript("Test transcript");
    } else if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  };

  return (
    <div className={controlStyles.wrapper}>
      <div className={controlStyles.statusIcon}>
        {getStatusIcon()}
      </div>
      <p>{getStatusMessage()}</p>
      <ListenButton
        isListening={isListening}
        isPaused={isPaused}
        isProcessing={isProcessing}
        onClick={handleListening}
      />
    </div>
  );
};

export default Controls;
