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
import PrintManager from "./admin/pages/print managment/PrintManager"
import EditPrint from "./admin/pages/print managment/EditPrint"
import Celender from "./admin/pages/celender/Celender"
import Sewing from "./admin/pages/sewing/Sewing"
import Posted from "./admin/pages/posted/Posted"
import Finished from "./admin/pages/finished/finished"
import Dashboard from "./admin/pages/Dashboard"

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
    path: "profile",
    element: <Profile />,
  },
  {
    path: "",
    element: <Chat />,
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
      {
        path: "settings/fabrics",
        element: <FabricsSettings />,
      },
      {
        path: "settings/fabrics/add",
        element: <AddFabric />,
      },
      {
        path: "settings/fabrics/edit",
        element: <EditFabric />,
      },
      {
        path: "settings/sewings",
        element: <SewingsSettings />,
      },
      {
        path: "settings/sewings/add",
        element: <AddSewing />,
      },
      {
        path: "settings/sewings/edit",
        element: <EditSewing />,
      },
      {
        path: "chap",
        element: <Chap />,
      },
      {
        path: "print-manager",
        element: <PrintManager />,
      },
      {
        path: "print-manager/:id",
        element: <EditPrint />,
      },
      {
        path: "plats",
        element: <Plats />,
      },
      {
        path: "celender",
        element: <Celender />,
      },
      {
        path: "sewing",
        element: <Sewing />,
      },
      {
        path: "posts",
        element: <Posted />,
      },
      {
        path: "finished",
        element: <Finished />,
      },
    ]
  },

])

export default router
