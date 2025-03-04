export function Body({
  letterStatus,
}: {
  letterStatus: Record<string, boolean>;
}) {
  const failedAttempts = Object.values(letterStatus).filter(
    (val) => !val
  ).length;

  return (
    <section className="relative">
      <div id="horca" className="flex flex-col items-center relative">
        <div className="w-1 h-10 absolute bg-amber-50 right-2"></div>
        <div className="w-10 h-10 absolute rounded-full border-[.2rem] border-amber-50 -right-2 top-10 padding-4"></div>
        <div className="flex justify-start w-36 h-3 bg-amber-50"></div>
        <div className="flex flex-col items-center">
          <div className="w-3 h-36 bg-amber-50"></div>
        </div>
      </div>

      <div
        id="body"
        className="flex flex-col items-center h-48 absolute top-10 -right-10 w-25"
      >
        <div
          id="head"
          className={`w-10 h-10 rounded-full bg-pink-100 mb-1 transition-opacity duration-500 text-black text-center ${
            failedAttempts >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {" "}
          {failedAttempts >= 7 && "x x"}
        </div>

        <div id="mid-part" className="flex items-center mb-1">
          <div
            id="left-arm"
            className={`w-3 h-12 rounded bg-pink-100 mr-1 transition-opacity duration-500 ${
              failedAttempts >= 3 ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <div
            id="trunk"
            className={`w-10 h-14 rounded bg-blue-800 transition-opacity duration-500 ${
              failedAttempts >= 2 ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          <div
            id="right-arm"
            className={`w-3 h-12 rounded bg-pink-100 ml-1 transition-opacity duration-500 ${
              failedAttempts >= 4 ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        <div id="legs" className="flex">
          <div
            id="left-leg"
            className={`w-4 h-16 rounded bg-red-800 mr-1 transition-opacity duration-500 ${
              failedAttempts >= 5 ? "opacity-100" : "opacity-0"
            }`}
          ></div>
          <div
            id="right-leg"
            className={`w-4 h-16 rounded bg-red-800 ml-1 transition-opacity duration-500 ${
              failedAttempts >= 6 ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
    </section>
  );
}
