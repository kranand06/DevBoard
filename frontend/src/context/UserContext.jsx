import { createContext, useContext, useEffect, useState } from "react"
import { checkAuth, loginUser, signupUser } from "../utils/auth.js";
import toast from "react-hot-toast";

export const UserContext = createContext({});

export default function UserProvider({ children }) {


    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    // const [platform, setPlatform] = useState(false);


    const fetchAuth = async () => {
        const res = await checkAuth();
        if (res) {
            setUser(res.user);
            setToken(res.token);
            // setPlatform(res.platforms);
        } else {
            setUser(null);
            setToken(null);
            // setPlatform(null);
        }
    };

    useEffect(() => {
        fetchAuth();
    }, []);

    const login = async (username, password) => {
        const res = await loginUser(username, password);

        if (res.success) {
            const { token, user } = res.data;

            localStorage.setItem("token", token);

            setUser(user);
            setToken(token);
            return res;
        }
        else {
            setUser(null);
            setToken(null);
            return res;
        }
    };

    const signup = async (name, username, email, password) => {
        const res = await signupUser(name, username, email, password);

        if (res.success) {
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            setUser(user);
            setToken(token);
            return res;
        }
        else {
            setUser(null);
            setToken(null);
            return res;
        }
    };

    const logout = async () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setCart({});
        toast.success("Logged out successfully!");
    }


    return (
        // <UserContext.Provider value={{ user, setUser, token, setToken, login, signup, logout, platform, setPlatform }}>
        <UserContext.Provider value={{ user, setUser, token, setToken, login, signup, logout }}>
            {children}
        </UserContext.Provider>
    );
}