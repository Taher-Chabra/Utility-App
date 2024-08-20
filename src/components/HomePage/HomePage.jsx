import React, { useContext, useState } from "react";
import { userContext } from "../../contexts/UserContext";

function HomePage() {
  const [username, setUsername] = useState("");

  const { user, setUser } = useContext(userContext);

  function handleChange(e) {
    e.preventDefault();
    setUser(username);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-center font-medium mt-8">
        <span className="text-xl dark:text-slate-200 text-slate-900 mr-3">
          Please tell us who is using the App
        </span>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-1 rounded-lg border focus:outline-none tracking-wider"
        />
        <button
          onClick={handleChange}
          className="ml-1 p-1 px-3 rounded-lg bg-green-600 text-white"
        >
          Save
        </button>
      </div>
      <p className="mt-20 text-5xl font-bold text-neutral-700 dark:text-white">
        Welcome to the Multipurpose Utility Application
        {user ? "," : "."} {user}
      </p>
      <p className="my-8 text-xl font-medium text-center text-stone-500 dark:text-gray-400">
        Tap on the utility tiles to use that utility
      </p>
    </div>
  );
}

export default HomePage;
