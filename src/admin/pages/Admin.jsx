import { useState } from "react"
import Cookies from "js-cookie"
import { useEffect } from "react"
import api from "../../api"
import {  Outlet } from "react-router-dom"
import Loading from "../../components/Loading"

export default function Admin() {
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (Boolean(Cookies.get("jht4"))) {
      async function checkToken() {
        return await api
          .get("isAdmin", {
            headers: { Authorization: "Bearer " + Cookies.get("jht4") },
          })
          .then((e) => {
            if (e.data.status) {
              setLoading(true)
              setIsAdmin(true)
            } else {
              setLoading(true)
              setIsAdmin(false)
            }
          })
          .catch((e) => {
            setLoading(true)
            setIsAdmin(false)
          })
      }
      checkToken()
    } else {
      setLoading(true)
      setIsAdmin(false)
    }
  }, [])

  if (loading) {
    if (isAdmin) {
        if(window.location.pathname === "/admin"){
          return window.location.replace("admin/dashboard")
        }else{
          return <Outlet />
        }
    } else {
      return window.location.replace("/")
    }
  } else {
    return <div className="flex justify-center items-center h-screen w-full"> <Loading /></div>
  }
}
