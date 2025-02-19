import styles from "../css/BibleVerse.module.css";
import { useTypewriter } from "../hooks/useTypewriter";

interface BibleVerseProps {
  verse?: {
    book: string;
    chapter: number;
    verse: number;
    text: string;
  } | null;
  darkMode: boolean; // Add darkMode prop
}

const BibleQuoteDisplay = ({ verse, darkMode }: BibleVerseProps) => {
  if (!verse || !verse.book || !verse.chapter || !verse.verse || !verse.text) {
    return (
      <div className={`${styles.verse} ${darkMode ? styles.dark : ""}`}>
        <div className={`${styles.skeleton} ${styles.reference}`}></div>
        <div className={`${styles.skeleton} ${styles.text}`}></div>
        <div className={`${styles.skeleton} ${styles.text}`}></div>
      </div>
    );
  }

  const typewriterText = useTypewriter(verse.text, 20);

  return (
    <div className={`${styles.verse} ${darkMode ? styles.dark : ""}`}>
      <h2>{`${verse.book} ${verse.chapter}:${verse.verse}`}</h2>
      <p className={darkMode ? styles.darkText : styles.lightText}>{typewriterText}</p> {/* Apply class */}
    </div>
  );
};

export default BibleQuoteDisplay;
