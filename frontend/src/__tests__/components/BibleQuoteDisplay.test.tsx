import { render, screen } from "@testing-library/react";
import BibleQuoteDisplay from "../../components/VerseDisplay";

describe("BibleQuoteDisplay", () => {
  it("renders loading state when no verse is provided", () => {
    render(<BibleQuoteDisplay verse={null} />);
    expect(screen.getByTestId("verse-skeleton")).toBeInTheDocument();
  });

  it("renders verse when provided", () => {
    const testVerse = {
      book: "Genesis",
      chapter: 1,
      verse: 1,
      text: "In the beginning God created the heaven and the earth.",
    };

    render(<BibleQuoteDisplay verse={testVerse} />);
    expect(screen.getByText("Genesis 1:1")).toBeInTheDocument();
    expect(screen.getByText(testVerse.text)).toBeInTheDocument();
  });
});
