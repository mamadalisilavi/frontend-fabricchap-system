import { createBrowserRouter } from "react-router-dom"
import Register from "./Auth/Register"
import Login from "./Auth/Login"
import Main from "./Pages/Main"
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
import AddPlats from "./admin/pages/plats/AddPlats"
import PrintManager from "./admin/pages/print managment/PrintManager"
import EditPrint from "./admin/pages/print managment/EditPrint"
import Celender from "./admin/pages/celender/Celender"
import Sewing from "./admin/pages/sewing/Sewing"
import Posted from "./admin/pages/posted/Posted"
import Finished from "./admin/pages/finished/finished"
import Dashboard from "./admin/pages/Dashboard"
import UsersSettings from "./admin/pages/settings/users/UsersSetting"
import EditUser from "./admin/pages/settings/users/EditUser"
import Password from "./Pages/Password"
import AddUser from "./admin/pages/settings/users/AddUser"
import ListChap from "./Pages/ListChap"
import FileUpload from "./components/chat/menu-chat/contents/FileUpload"
import Prices from "./Pages/Prices"
import Info from "./Pages/Info"
import Finance from "./admin/pages/finance/Finance"

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
    path: "chinge-password",
    element: <Password />,
  },
  {
    path: "",
    element: <Main />,
    children: [
      {
        path: "",
        element: <FileUpload />,
      },
      {
        path: "list-chaps",
        element: <ListChap />,
      },
      {
        path: "prices",
        element: <Prices />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "products",
        element: <></>,
      },
    ]
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
        path: "finance",
        element: <Finance />,
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
        path: "settings/users",
        element: <UsersSettings />,
      },
      {
        path: "settings/users/add",
        element: <AddUser
        />,
      },
      {
        path: "settings/users/edit",
        element: <EditUser />,
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
        path: "add-plats",
        element: <AddPlats />,
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
    ],
  },
])

export default router
