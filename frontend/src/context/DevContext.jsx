import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "./UserContext";

export const DevContext = createContext({});

export default function DevProvider({ children }) {


    const [githubdata, setGithubData] = useState(null);
    const [leetcodedata, setLeetcodeData] = useState(null);
    const [codechefdata, setCodechefData] = useState(null);
    const [codeforcesdata, setCodeforcesData] = useState(null);
    const [handle, setHandle] = useState(null);
    const [data, setData] = useState(null);


    const fetchData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found in localStorage.");
            return;
        }
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dev/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = res.data;
            if (res.status === 200) {
                setData(data);
                setGithubData(data.githubData);
                setLeetcodeData(data.leetcodeData);
                setCodechefData(data.codechefData);
                setCodeforcesData(data.codeforcesData);
                setHandle(data.handle);
            } else {
                console.error("Error fetching data:", data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    return (
        // <DevContext.Provider value={{ user, setUser, token, setToken, login, signup, logout, platform, setPlatform }}>
        <DevContext.Provider value={{ githubdata, leetcodedata, codechefdata, codeforcesdata, data, handle }}>
            {children}
        </DevContext.Provider>
    );
}

    // const login = async (username, password) => {
    //     const res = await loginUser(username, password);

    //     if (res.success) {
    //         const { token, user } = res.data;

    //         localStorage.setItem("token", token);

    //         setUser(user);
    //         setToken(token);
    //         return res;
    //     }
    //     else {
    //         setUser(null);
    //         setToken(null);
    //         return res;
    //     }
    // };

    // const signup = async (name, username, email, password) => {
    //     const res = await signupUser(name, username, email, password);

    //     if (res.success) {
    //         const { token, user } = res.data;
    //         localStorage.setItem("token", token);
    //         setUser(user);
    //         setToken(token);
    //         return res;
    //     }
    //     else {
    //         setUser(null);
    //         setToken(null);
    //         return res;
    //     }
    // };

    // const logout = async () => {
    //     localStorage.removeItem("token");
    //     setUser(null);
    //     setToken(null);
    //     setCart({});
    //     toast.success("Logged out successfully!");
    // }
