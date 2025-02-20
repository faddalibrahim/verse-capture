import Icons from "./Icons";
import { useDarkMode } from "../hooks/useDarkMode";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="w-full flex justify-between items-center mb-8 px-4 py-2 md:px-10 md:py-3 bg-white dark:bg-[#1c1b22] shadow-xs">
      <a
        href="https://github.com/faddalibrahim/verse-catch"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 dark:text-white cursor-pointer p-4 hover:bg-gray-100 dark:hover:bg-[#574964] rounded-full"
      >
        <Icons.Github />
      </a>
      <h1 className="text-xl text-gray-700 md:text-4xl font-medium md:font-bold tracking-wide flex items-center gap-2 dark:text-white">
        Verse
        <Icons.AudioLines />
        Catch
      </h1>
      <button
        onClick={toggleDarkMode}
        className="p-4 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#574964] cursor-pointer"
      >
        {darkMode ? <Icons.Sun /> : <Icons.Moon />}
      </button>
    </header>
  );
};

export default Header;
