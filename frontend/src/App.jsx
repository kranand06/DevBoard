import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login";
import Error404 from "./Components/Error404";
import Signup from "./pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import Home from "./Components/Home";
import UserProvider from "./context/UserContext";
import DashboardPage from "./pages/dashboard/DashboardPage";
import GitHubPage from "./pages/github/GitHubPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import DevProvider from "./context/DevContext";
import ProductivityProvider from "./context/ProductivityContext"
import LeetCodePage from "./pages/leetcode/LeetCodePage";
import RestrictedRoute from "./Components/RestrictedRoute";
import CodeChefPage from "./pages/codechef/CodeChefPage";
import CodeforcesPage from "./pages/codeforces/CodeforcesPage";
import ProfilePage from "./pages/profile/ProfilePage"

function App() {


  return (
    <>
      <UserProvider>
        <DevProvider>
          <ProductivityProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<RestrictedRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/github" element={<GitHubPage />} />
                  <Route path="/leetcode" element={<LeetCodePage />} />
                  <Route path="/codechef" element={<CodeChefPage />} />
                  <Route path="/codeforces" element={<CodeforcesPage />} />
                  {/* <Route path="/tasks" element={<TasksPage />} /> */}
                  {/* <Route path="/notes" element={<NotesPage />} /> */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/*" element={<Error404 />} />
                </Route>
              </Routes>
              <Toaster />
            </BrowserRouter>
          </ProductivityProvider>
        </DevProvider>
      </UserProvider>
    </>
  )
}

export default App
