import { Outlet } from "react-router-dom"
// import Navbar from "./Components/Navbar"
// import Footer from "./Components/Footer"
import { createContext, useEffect, useState } from 'react'
import ThemeToggle from "./Components/ThemeToggle";


export const UserContext = createContext();

function App() {

  const [open, setOpen] = useState(false);

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
    document.documentElement.classList.remove("theme-light", "theme-dark");
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
    <UserContext.Provider value={{ open, setOpen }}>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
      </UserContext.Provider>
    </>
  )
}

export default App
