import ListenButton from "./ListenButton";
import controlStyles from "../css/Controls.module.css";
import Icons from "./Icons";
import { useAudioRecording } from "../hooks/useAudioRecording";

interface ControlsProps {
  onTranscript: (text: string) => void;
}

const Controls = ({ onTranscript }: ControlsProps) => {
  const {
    startRecording,
    pauseRecording,
    resumeRecording,
    isRecording,
    isPaused,
  } = useAudioRecording();

  const getStatusIcon = () => {
    if (!isRecording) return <Icons.Analytics />;
    if (isRecording && !isPaused) return <Icons.AudioLines />;
    return <Icons.Pause />;
  };

  const handleListening = async () => {
    if (!isRecording) {
      await startRecording();
      onTranscript("Recording started...");
    } else if (!isPaused) {
      pauseRecording(); // Changed from stopRecording to pauseRecording
      onTranscript("Recording paused.");
    } else {
      resumeRecording();
      onTranscript("Recording resumed...");
    }
  };

  return (
    <div className={controlStyles.wrapper}>
      <div className={controlStyles.statusIcon}>{getStatusIcon()}</div>
      <p>Transcribing and detecting Bible quotations in real time</p>
      <ListenButton
        isListening={isRecording}
        isPaused={isPaused}
        onClick={handleListening}
      />
    </div>
  );
};

export default Controls;
