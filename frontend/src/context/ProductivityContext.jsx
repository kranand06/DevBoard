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

    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const { token } = useContext(UserContext);

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);


    const fetchData = async () => {
        if (!token) {
            return;
        }
        try {
            const res = await axios.get(`${API_URL}/api/productivity/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const responseData = res.data;
            if (res.status === 200) {
                setData(responseData);
                setTodos(responseData.todos);
                setNotes(responseData.notes);
                setGoals(responseData.goals);
            } else {
                toast.error("Error fetching data");
                console.log(responseData)
            }
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error("Unauthorised user.");
            } else {
                toast.error("Error fetching data");
            }
            console.log(error);
        }
    }

    const addGoals = async (goal, date) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.post(`${API_URL}/api/productivity/goals`, { goal, date }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 201) {
                const data = res.data;
                setGoals(data.goals)
                toast.success("Goal Added")
            } else {
                toast.error("Error adding goal");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error adding goal")
            console.log(error)
        }
    }

    const updateGoals = async (goalId, goal, date, completed) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.put(`${API_URL}/api/productivity/goals`, { goalId, goal, date, completed }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                const data = res.data;
                setGoals(data.goals)
                toast.success("Goal Updated")
            } else {
                toast.error("Error updating goal");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error updating goal")
            console.log(error)
        }
    }

    const deleteGoals = async (goalID) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.delete(`${API_URL}/api/productivity/goals/${goalID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                const data = res.data;
                setGoals(data.goals)
                toast.success("Goal Deleted")
            } else {
                toast.error("Error deleting goal");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error deleting goal")
            console.log(error)
        }
    }

    const addNotes = async (title, content) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.post(`${API_URL}/api/productivity/notes`, { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 201) {
                const data = res.data;
                setNotes(data.notes)
                toast.success("Notes Added")
            } else {
                toast.error("Error adding notes");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error adding notes")
            console.log(error)
        }
    }

    const updateNotes = async (noteId, title, content) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.put(`${API_URL}/api/productivity/notes`, { noteId, title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                const data = res.data;
                setNotes(data.notes)
                toast.success("Notes Updated")
            } else {
                toast.error("Error updating notes");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error updating notes")
            console.log(error)
        }
    }

    const deleteNotes = async (noteID) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.delete(`${API_URL}/api/productivity/notes/${noteID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                const data = res.data;
                setNotes(data.notes)
                toast.success("Notes Deleted")
            } else {
                toast.error("Error deleting notes");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error deleting notes")
            console.log(error)
        }
    }

    const addTodos = async (text, priority) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.post(`${API_URL}/api/productivity/todos`, { text, priority }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 201) {
                const data = res.data;
                setTodos(data.todos)
                toast.success("Task Added")
            } else {
                toast.error("Error adding todo");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error adding todo")
            console.log(error)
        }
    }

    const updateTodos = async (todoId, text, priority, completed) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.put(`${API_URL}/api/productivity/todos`, { todoId, text, priority, completed }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                const data = res.data;
                setTodos(data.todos)
                toast.success("Task Updated")
            } else {
                toast.error("Error updating todo");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error updating todo")
            console.log(error)
        }
    }

    const deleteTodos = async (todoId) => {
        if (!token) {
            toast.error("Unauthorised user.");
            return;
        }
        try {
            const res = await axios.delete(`${API_URL}/api/productivity/todos/${todoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                const data = res.data;
                setTodos(data.todos)
                toast.success("Task Deleted")
            } else {
                toast.error("Error deleting todo");
                console.log(res);
            }

        } catch (error) {
            toast.error("Error deleting todo")
            console.log(error)
        }
    }


    return (
        // <DevContext.Provider value={{ user, setUser, token, setToken, login, signup, logout, platform, setPlatform }}>
        <ProductivityContext.Provider value={{
            todos, notes, goals, data,
            addGoals, updateGoals, deleteGoals,
            addNotes, updateNotes, deleteNotes,
            addTodos, updateTodos, deleteTodos,
        }}>
            {children}
        </ProductivityContext.Provider>
    );
}