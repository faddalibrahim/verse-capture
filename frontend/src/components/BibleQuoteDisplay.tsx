import styles from "../css/BibleVerse.module.css";

interface BibleVerseProps {
  verse?: {
    reference: string;
    text: string;
    translation: string;
  } | null;
}

const BibleQuoteDisplay = ({ verse }: BibleVerseProps) => {
  if (!verse) {
    return (
      <div className={styles.verse}>
        <h2>John 3:16 (KJV)</h2>
        <p>
          For God so loved the world that he gave his only begotton Son, that
          whosoever believeth in him should not perish, but have everlasting
          life.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.verse}>
      <h2>{`${verse.reference} (${verse.translation})`}</h2>
      <p>{verse.text}</p>
    </div>
  );
};

export default BibleQuoteDisplay;
