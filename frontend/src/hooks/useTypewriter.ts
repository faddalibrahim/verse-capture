import { useState, useEffect } from "react";

export const useTypewriter = (text: string | null, speed: number = 100) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    setDisplayedText("");
    let index = -1;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    console.log(displayedText);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};
