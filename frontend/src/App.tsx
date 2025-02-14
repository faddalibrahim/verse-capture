import { useState } from "react";
import Controls from "./components/Controls";
import BibleQuoteDisplay from "./components/BibleQuoteDisplay";
import AppStyles from "./css/App.module.css";

function App() {
  // const [transcript, setTranscript] = useState<string>("");
  const [verse] = useState<{
    reference: string;
    text: string;
    translation: string;
  } | null>(null);

  const handleTranscript = (text: string) => {
    console.log(text);
    // setTranscript(text);
    // Will handle API call here
  };

  return (
    <div className={AppStyles.app}>
      <h1 className={AppStyles.appName}>VerseCatch</h1>
      <BibleQuoteDisplay verse={verse} />
      <Controls onTranscript={handleTranscript} />
    </div>
  );
}

export default App;
