import Loader from "./Loader";
import { useTypewriter } from "../hooks/useTypewriter";

interface VerseDisplayProps {
  verse?: {
    book: string;
    chapter: number;
    verse: number;
    text: string;
    translation?: string;
  } | null;
}

const VerseDisplay = ({ verse }: VerseDisplayProps) => {
  if (!verse || !verse.book || !verse.chapter || !verse.verse || !verse.text) {
    return <Loader />;
  }

  const typewriterText = useTypewriter(verse.text, 20);
  const typewriterTranslation = useTypewriter(verse.translation || "", 20);

  return (
    <div className="lg:w-[60vw] text-center grow flex flex-col justify-center overflow-scroll py-6 px-4">
      <h2 className="text-3xl font-medium dark:text-white">{`${verse.book} ${verse.chapter}:${verse.verse}`}</h2>
      <p
        className={`dark:text-white mt-5 ${
          verse.translation ? "text-2xl lg:text-4xl" : "text-lg"
        }`}
      >
        {typewriterText}
      </p>
      {verse.translation && (
        <p className="mt-5 dark:text-white text-xl">{typewriterTranslation}</p>
      )}
    </div>
  );
};

export default VerseDisplay;
