import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Chat from "./Pages/Chat";
import Admin from "./admin/pages/Admin";
import AdminSettings from "./admin/pages/AdminSettings";
import Profile from "./Pages/Profile";
import FabricsSettings from "./admin/pages/FabricsSettings";

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
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "admin/settings",
    element: <AdminSettings />,
    children: [
      {
        path: "fabrics",
        element: <FabricsSettings />,
      },
    ],
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);

export default router;
