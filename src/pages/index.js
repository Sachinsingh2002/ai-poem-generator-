import { useState } from "react";

export default function Home() {
  const [poem, setPoem] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const generatePoem = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/poem-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const { poem } = await response.json();
      setPoem(poem);
    } catch (error) {
      console.error("Failed to generate poem:", error);
    }

    setIsLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">AI Poem Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Start typing your poetic inspiration here..."
        className={`px-4 py-2 border ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300"} rounded-lg mb-4 w-80 h-40`}
      />
      <button
        onClick={generatePoem}
        className={`px-4 py-2 ${darkMode ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-500 hover:bg-blue-600"} text-white rounded-lg mb-4`}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Poem"}
      </button>
      <button
        onClick={toggleDarkMode}
        className={`px-4 py-2 ${darkMode ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-300 hover:bg-gray-400"} text-gray-900 rounded-lg`}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      {isLoading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      )}
      {poem && (
        <div className="mt-4 p-4 border rounded-lg">
          <p>{poem}</p>
        </div>
      )}
    </div>
  );
}
