import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Chat from "./Pages/Chat";
import Admin from "./admin/pages/Admin";
import AdminSettings from "./admin/pages/AdminSettings";
import Profile from "./Pages/Profile";
import FabricsSettings from "./admin/pages/FabricsSettings";
import AddFabric from "./admin/pages/AddFabric";
import EditFabric from "./admin/pages/EditFabric";

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
  },
  {
    path: "admin/settings/fabrics",
    element: <FabricsSettings />,
  },
  {
    path: "admin/settings/fabrics/add",
    element: <AddFabric />,
  },
  {
    path: "admin/settings/fabrics/edit",
    element: <EditFabric />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);

export default router;
