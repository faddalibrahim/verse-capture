import { useState } from "react";
import Controls from "./components/Controls";
import BibleQuoteDisplay from "./components/BibleQuoteDisplay";
import AppStyles from "./css/App.module.css";

function App() {
  const [verse, setVerse] = useState<{
    reference: string;
    text: string;
  } | null>(null);

  const handleTranscript = (text: string) => {
    console.log(text);
  };

  return (
    <div className={AppStyles.app}>
      <h1 className={AppStyles.appName}>VerseCatch</h1>
      <BibleQuoteDisplay verse={verse} />
      <Controls onTranscript={handleTranscript} onVerseReceived={setVerse} />
    </div>
  );
}

export default App;
