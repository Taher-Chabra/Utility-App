import { useEffect, useState } from "react";
import UserContextProvider from "./contexts/UserContext";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { ThemeContextProvider } from "./contexts/ThemeContext";

function App() {
  const [colorMode, setColorMode] = useState("dark");

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(colorMode);
  }, [colorMode]);

  return (
    <ThemeContextProvider value={{ colorMode, toggleColorMode }}>
      <div className="w-full h-screen bg-gray-200 dark:bg-gray-600">
        <UserContextProvider>
          <Header />
          <div className="relative top-36">
            <Outlet />
          </div>
        </UserContextProvider>
      </div>
    </ThemeContextProvider>
  );
}

export default App;