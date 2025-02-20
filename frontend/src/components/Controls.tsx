import ListenButton from "./ListenButton";
import Icons from "./Icons";
import { useAudioRecording } from "../hooks/useAudioRecording";

interface ScriptureVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

interface ControlsProps {
  onVerseReceived: (verse: ScriptureVerse | null) => void;
}

const Controls = ({ onVerseReceived }: ControlsProps) => {
  const {
    startRecording,
    pauseRecording,
    resumeRecording,
    isRecording,
    isPaused,
  } = useAudioRecording({ onVerseReceived });

  const getStatusIcon = () => {
    if (!isRecording) return <Icons.Disc />;
    if (isRecording && !isPaused) return <Icons.AudioLines />;
    return <Icons.Pause />;
  };

  const handleListening = async () => {
    if (!isRecording) {
      await startRecording();
    } else if (!isPaused) {
      pauseRecording();
    } else {
      resumeRecording();
    }
  };

  return (
    <div className="p-10 w-full lg:w-[40vw] flex flex-col items-center gap-10 lg:gap-6 rounded-t-3xl  bg-white dark:bg-[#1c1b22]">
      <div className="dark:text-white p-4 bg-gray-50 dark:bg-[#574964] rounded-full">
        {getStatusIcon()}
      </div>
      <p className="text-center dark:text-white">
        Transcribing and detecting Bible & Quran quotations in real time
      </p>
      <ListenButton
        isListening={isRecording}
        isPaused={isPaused}
        onClick={handleListening}
      />
    </div>
  );
};

export default Controls;
