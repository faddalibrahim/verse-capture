import styles from "../css/ListenButton.module.css";
import Icons from "./Icons";

interface ListenButtonProps {
  isListening: boolean;
  isPaused: boolean;
  isProcessing: boolean;
  onClick: () => void;
}

const ListenButton = ({
  isListening,
  isPaused,
  isProcessing,
  onClick,
}: ListenButtonProps) => {
  const getButtonText = () => {
    if (isProcessing) return "Processing...";
    if (!isListening) return "Start Listening";
    if (isPaused) return "Continue Listening";
    return "Stop Listening";
  };

  const getButtonIcon = () => {
    if (isProcessing) return <Icons.AudioLines />;
    if (isListening && !isPaused) return <Icons.MicOff />;
    return <Icons.Mic />;
  };

  return (
    <button
      className={`${styles.button} ${
        isListening && !isPaused ? styles.listening : ""
      } ${isProcessing ? styles.processing : ""}`}
      onClick={onClick}
      disabled={isProcessing}
    >
      {getButtonIcon()}
      {getButtonText()}
    </button>
  );
};

export default ListenButton;
