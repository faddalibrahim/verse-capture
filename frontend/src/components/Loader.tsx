const Loader = () => {
  return (
    <div className="flex transition-all duration-400">
      <div className="ml-3 h-4 w-4 rounded-full bg-[#222222] shadow-[inset_2px_2px_10px_black] animate-brighten"></div>
      <div className="ml-3 h-4 w-4 rounded-full bg-[#222222] shadow-[inset_2px_2px_10px_black] animate-brighten-delay-2"></div>
      <div className="ml-3 h-4 w-4 rounded-full bg-[#222222] shadow-[inset_2px_2px_10px_black] animate-brighten-delay-4"></div>
    </div>
  );
};

export default Loader;
