import { useState } from "react";
import Controls from "./components/Controls";
import BibleQuoteDisplay from "./components/BibleQuoteDisplay";
import AppStyles from "./css/App.module.css";
import Icons from "./components/Icons"; // Import Icons

function App() {
  const [verse, setVerse] = useState<{
    book: string;
    chapter: number;
    verse: number;
    text: string;
  } | null>(null);

  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const handleTranscript = (text: string) => {
    console.log(text);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`${AppStyles.app} ${
        darkMode ? AppStyles.dark : AppStyles.light
      }`}
    >
      <header className={AppStyles.header}>
        <h1 className={AppStyles.appName}>
          Verse
          <Icons.BookOpen />
          Capture
        </h1>
        <button onClick={toggleDarkMode} className={AppStyles.toggleButton}>
          {darkMode ? <Icons.Sun /> : <Icons.Moon />}
        </button>
      </header>
      <BibleQuoteDisplay verse={verse} darkMode={darkMode} />
      <Controls
        onTranscript={handleTranscript}
        onVerseReceived={setVerse}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
