import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full  sm:translate-x-0 bg-gray-800 border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
        <ul className="space-y-2 font-medium flex flex-col *:py-2 *:cursor-pointer   *:rounded text-white">
          <h1 className="hover:bg-opacity-0">
            <Link to="/" className="text-4xl text-white">
              Minigames
            </Link>
          </h1>

          <Link className="hover:bg-blue-500" to="/ahorcado">
            Ahorcado
          </Link>

          <Link className="hover:bg-blue-500" to="/ahorcado">
            Ahorcado
          </Link>

          <Link className="hover:bg-blue-500" to="/ahorcado">
            Ahorcado
          </Link>
        </ul>
      </div>
    </aside>
  );
}
