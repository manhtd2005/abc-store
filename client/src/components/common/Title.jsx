const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
        {text1}
      </h2>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 relative">
        {text2}
        <span className="absolute left-0 -bottom-1 w-full h-1 bg-blue-500 rounded-full"></span>
      </h2>
    </div>
  );
};

export default Title;
