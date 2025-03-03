export function Body() {
  return (
    <div id="body" className="flex flex-col items-center">
      <div id="head" className="w-10 h-10 rounded-full bg-pink-100 mb-1"></div>
      <div id="mid-part" className="flex items-center mb-1">
        <div id="left-arm" className="w-3 h-12 rounded bg-pink-100 mr-1"></div>
        <div id="trunk" className="w-10 h-14 rounded bg-blue-800"></div>
        <div id="right-arm" className="w-3 h-12 rounded bg-pink-100 ml-1"></div>
      </div>
      <div id="legs" className="flex">
        <div id="left-leg" className="w-4 h-15 rounded bg-red-800 mr-1"></div>
        <div id="right-leg" className="w-4 h-15 rounded bg-red-800 ml-1"></div>
      </div>
    </div>
  );
}
