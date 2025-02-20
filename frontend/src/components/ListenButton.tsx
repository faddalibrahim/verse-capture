import Icons from "./Icons";

interface ListenButtonProps {
  isListening: boolean;
  isPaused: boolean;
  onClick: () => void;
}

const ListenButton = ({
  isListening,
  isPaused,
  onClick,
}: ListenButtonProps) => {
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
      className={`${
        isListening && !isPaused
          ? "bg-[#ffe4e4] text-[#ff4444]"
          : "bg-gray-800 text-white dark:bg-[#574964]"
      } flex justify-center items-center gap-3 px-5 py-3 rounded-4xl w-60 cursor-pointer`}
      onClick={onClick}
    >
      {getButtonIcon()}
      {getButtonText()}
    </button>
  );
};

export default ListenButton;
