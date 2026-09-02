import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { createContext, useEffect, useState } from 'react'
import ThemeToggle from "./Components/ThemeToggle";
import Login from "./pages/auth/Login";
import Error404 from "./Components/Error404";
import Signup from "./pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import { User } from "lucide-react";
import UserProvider from "./context/UserContext";


function App() {


  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App
