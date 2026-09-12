import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "./UserContext";

export const DevContext = createContext({});

export default function DevProvider({ children }) {

    const API_URL = import.meta.env.VITE_BACKEND_URL;


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
            const res = await axios.get(`${API_URL}/api/dev/stats`, {
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
    const refreshData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found in localStorage.");
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/api/dev/refresh`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = res?.data?.platform;
            if (res.status === 200) {
                setData(data);
                setGithubData(data.githubData);
                setLeetcodeData(data.leetcodeData);
                setCodechefData(data.codechefData);
                setCodeforcesData(data.codeforcesData);
                setHandle(data.handle);
                // console.log(data)
                toast.success("Stats refreshed Successfully")
            } else {
                toast.error("Error fetching data");
                console.error("Error fetching data:", data.message);
            }
            // console.log(data);
        } catch (error) {
            toast.error("Error fetching data");
            console.log("Error updating platform", error)
        }
    }



    useEffect(() => {
        fetchData();
    }, []);

    const updatePlatform = async (form) => {
        const token = localStorage.getItem("token")
        // const leetcodeHandle = form?.leetcodeHandle || undefined;
        // const codeforcesHandle = form?.codeforcesHandle || undefined;
        // const codechefHandle = form?.codechefHandle || undefined;
        // const githubHandle = form?.githubHandle || undefined;

        if (!token) {
            console.log("No token provided")
            return;
        }
        try {
            console.log(form);
            const res = await axios.put(
                `${API_URL}/api/dev/platform`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const data = res?.data?.platform;
            if (res.status === 200) {
                setData(data);
                setGithubData(data.githubData);
                setLeetcodeData(data.leetcodeData);
                setCodechefData(data.codechefData);
                setCodeforcesData(data.codeforcesData);
                setHandle(data.handle);
                toast.success("Platform Updated Successfully")
            } else {
                toast.error("Error fetching data");
                console.error("Error fetching data:", data.message);
            }
            // console.log(data);
        } catch (error) {
            toast.error("Error fetching data");
            console.log("Error updating platform", error)
        }
    }


    return (
        // <DevContext.Provider value={{ user, setUser, token, setToken, login, signup, logout, platform, setPlatform }}>
        <DevContext.Provider value={{ githubdata, leetcodedata, codechefdata, codeforcesdata, data, handle, updatePlatform, refreshData }}>
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
