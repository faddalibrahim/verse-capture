import { useState } from "react";
import Controls from "./components/Controls";
import BibleVerse from "./components/BibleVerse";
import AppStyles from "./css/App.module.css";

function App() {
  const [transcript, setTranscript] = useState<string>("");
  const [verse, setVerse] = useState<{
    reference: string;
    text: string;
    translation: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTranscript = (text: string) => {
    setTranscript(text);
    setIsProcessing(true);
    // Will handle API call here
  };

  return (
    <div className={AppStyles.app}>
      <h1 className={AppStyles.appName}>VerseCatch</h1>
      <BibleVerse verse={verse} />
      <Controls onTranscript={handleTranscript} isProcessing={isProcessing} />
    </div>
  );
}

export default App;
