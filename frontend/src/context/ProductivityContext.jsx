import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

export const ProductivityContext = createContext({});

export default function ProductivityProvider({ children }) {


    const [todos, setTodos] = useState(null);
    const [notes, setNotes] = useState(null);
    const [goals, setGoals] = useState(null);
    const [data, setData] = useState(null);

   const API_URL =import.meta.env.VITE_BACKEND_URL;
   const {token} = useContext(UserContext);


    const fetchData = async () => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/api/productivity/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = res.data;
            if (res.status === 200) {
                setData(data);
                setTodos(data.todos);
                setNotes(data.notes);
                setGoals(data.goals);
            } else {
                toast.error("Error fetching data:", data.message);
            }
        } catch (error) {
            toast.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    // const addTodos = async ()=>{
    //     try{}catch (error){
    //         console.error("Error adding note")
    //     }
    // }
    const addTodos = async (title,content) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                title,
                content,
            });
            if(res.status==201){
                console.log(res.data);
            }

        } catch (error) {
            toast.error("Error adding note")
            console.log(error)
        }
    }


    return (
        // <DevContext.Provider value={{ user, setUser, token, setToken, login, signup, logout, platform, setPlatform }}>
        <ProductivityContext.Provider value={{ todos, notes, goals, data, addTodos }}>
            {children}
        </ProductivityContext.Provider>
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
