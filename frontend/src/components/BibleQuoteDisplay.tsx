import styles from "../css/BibleVerse.module.css";
import { useTypewriter } from "../hooks/useTypewriter";

interface BibleVerseProps {
  verse?: {
    book: string;
    chapter: number;
    verse: number;
    text: string;
  } | null;
}

const BibleQuoteDisplay = ({ verse }: BibleVerseProps) => {
  if (!verse || !verse.book || !verse.chapter || !verse.verse || !verse.text) {
    return (
      <div className={styles.verse}>
        <div className={`${styles.skeleton} ${styles.reference}`}></div>
        <div className={`${styles.skeleton} ${styles.text}`}></div>
        <div className={`${styles.skeleton} ${styles.text}`}></div>
      </div>
    );
  }

  const typewriterText = useTypewriter(verse.text, 20);

  return (
    <div className={styles.verse}>
      <h2>{`${verse.book} ${verse.chapter}:${verse.verse}`}</h2>
      <p>{typewriterText}</p>
    </div>
  );
};

export default BibleQuoteDisplay;
