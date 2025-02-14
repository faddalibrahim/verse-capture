import styles from "../css/ListenButton.module.css";
import Icons from "./Icons";

interface ListenButtonProps {
  isListening: boolean;
  isPaused: boolean;
  onClick: () => void;
}

const ListenButton = ({ isListening, isPaused, onClick }: ListenButtonProps) => {
  const getButtonText = () => {
    if (!isListening) return "Start Listening";
    if (!isPaused) return "Stop Listening";
    return "Continue Listening";
  };

  const getButtonIcon = () => {
    if (!isListening) return <Icons.Mic />;
    if (!isPaused) return <Icons.MicOff />;
    return <Icons.Mic />;
  };

  return (
    <button
      className={`${styles.button} ${
        isListening && !isPaused ? styles.listening : ""
      }`}
      onClick={onClick}
    >
      {getButtonIcon()}
      {getButtonText()}
    </button>
  );
};

export default ListenButton;
