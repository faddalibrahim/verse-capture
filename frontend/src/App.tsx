import { useState } from "react";
import Controls from "./components/Controls";
import BibleQuoteDisplay from "./components/VerseDisplay";
import Header from "./components/Header";

function App() {
  const [verse, setVerse] = useState<{
    book: string;
    chapter: number;
    verse: number;
    text: string;
  } | null>(null);

  return (
    <div className="h-[100dvh] flex flex-col justify-between items-center bg-gray-50 dark:bg-[#1c1b22]/98">
      <Header />
      <BibleQuoteDisplay verse={verse} />
      <Controls onVerseReceived={setVerse} />
    </div>
  );
}

export default App;
