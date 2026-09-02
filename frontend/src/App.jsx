import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { createContext, useEffect, useState } from 'react'
import Login from "./pages/auth/Login";
import Error404 from "./Components/Error404";
import Signup from "./pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import { User } from "lucide-react";
import UserProvider from "./context/UserContext";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import DevProvider from "./context/DevContext";


function App() {


  return (
    <>
      <UserProvider>
        <DevProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* <Route path="/github" element={<GitHubPage />} />
              <Route path="/leetcode" element={<LeetCodePage />} />
              <Route path="/codechef" element={<CodeChefPage />} />
              <Route path="/codeforces" element={<CodeforcesPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/profile" element={<ProfilePage />} /> */}
            </Route>
            <Route path="/*" element={<Error404 />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
        </DevProvider>
      </UserProvider>
    </>
  )
}

export default App
