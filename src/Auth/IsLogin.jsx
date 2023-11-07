import { useState } from "react"
import Cookies from "js-cookie"
import { useEffect } from "react"
import api from "../api";

export default function IsLogin({ children, isNotLogin = false }) {
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (Boolean(Cookies.get("jht4"))) {
      async function checkToken() {
        return await api
          .get("checktoken", { headers: { Authorization: "Bearer " + Cookies.get("jht4") } })
          .then((e) => {
            if (e.data.token) {
              setLoading(true)
              setIsLogin(true)
            } else {
              setLoading(true)
              setIsLogin(false)
            }
          })
          .catch((e) => {
            setLoading(true)
            setIsLogin(false)
          })
      }
      checkToken()
    } else {
      setLoading(true)
      setIsLogin(false)
    }
  }, [])
  if (isNotLogin) {
    if (loading) {
      if (!isLogin) {
        return <>{children}</>
      } else {
        return window.location.replace("/home")
      }
    } else {
      return <div className="h-screen flex justify-center items-center">لطفا صبر کنید</div>
    }
  } else {
    if (loading) {
      if (isLogin) {
        return <>{children}</>
      } else {
        return window.location.replace("/home")
      }
    } else {
      return <div className="h-screen flex justify-center items-center">لطفا صبر کنید</div>
    }
  }
}
