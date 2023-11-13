import { createBrowserRouter } from "react-router-dom"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import Chat from "./Pages/Chat"
import Admin from "./admin/pages/Admin"
import AdminSettings from "./admin/pages/AdminSettings"
import Profile from "./Pages/Profile"
import FabricsSettings from "./admin/pages/FabricsSettings"
import AddFabric from "./admin/pages/AddFabric"
import EditFabric from "./admin/pages/EditFabric"
import AddSewing from "./admin/pages/settings/sewing/AddSewing"
import SewingsSettings from "./admin/pages/settings/sewing/SewingsSettings"
import EditSewing from "./admin/pages/settings/sewing/EditSewing"
import Plats from "./admin/pages/plats/Plats"
import Chap from "./admin/pages/plats/Chap"

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
    path: "admin/settings/sewings",
    element: <SewingsSettings />,
  },
  {
    path: "admin/settings/sewings/add",
    element: <AddSewing />,
  },
  {
    path: "admin/settings/sewings/edit",
    element: <EditSewing />,
  },
  {
    path: "admin/chap",
    element: <Chap />,
  },
  {
    path: "admin/chaps-manager",
    element: <Chap />,
  },
  {
    path: "admin/plats",
    element: <Plats />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
])

export default router
