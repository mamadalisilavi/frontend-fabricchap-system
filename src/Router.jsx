import { createBrowserRouter, Navigate } from "react-router-dom"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import Chat from "./Pages/Chat"


const router = createBrowserRouter([
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "",
        element: <Chat />,
    }
])

export default router