import { useState } from "react";
import Greetings from "./sections/Greetings.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-600 flex flex-col justify-around items-center min-h-screen text-white">
      <Greetings />
      <button
        className="bg-gray-500 rounded-md border px-2"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </div>
  );
}

export default App;
