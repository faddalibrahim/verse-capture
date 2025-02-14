import styles from "../css/BibleVerse.module.css";

interface BibleVerseProps {
  verse?: {
    reference: string;
    text: string;
  } | null;
}

const BibleQuoteDisplay = ({ verse }: BibleVerseProps) => {
  if (!verse) {
    return (
      <div className={styles.verse}>
        <div className={`${styles.skeleton} ${styles.reference}`}></div>
        <div className={`${styles.skeleton} ${styles.text}`}></div>
        <div className={`${styles.skeleton} ${styles.text}`}></div>
      </div>
    );
  }

  return (
    <div className={styles.verse}>
      <h2>{verse.reference}</h2>
      <p>{verse.text}</p>
    </div>
  );
};

export default BibleQuoteDisplay;
