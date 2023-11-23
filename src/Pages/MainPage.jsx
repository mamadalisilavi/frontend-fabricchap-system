import { Link } from "react-router-dom"
import { BsChatLeftDotsFill } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { useState } from "react"
import Cookies from "js-cookie"
import { useEffect } from "react"
import api from "../api"
import Loading from "../components/Loading"
export default function MainPage({ children }) {
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (Boolean(Cookies.get("jht4"))) {
      async function checkToken() {
        return await api
          .get("checktoken", {
            headers: { Authorization: "Bearer " + Cookies.get("jht4") },
          })
          .then((e) => {
            if (e.data.token) {
              setLoading(true)
              setIsLogin(true)
              Cookies.set("customer", e.data.customer)
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

  if (loading) {
    if (isLogin) {
      return (
        <div className="w-full md:w-9/12 lg:w-1/2  mx-auto container">
          <div>{children}</div>
          <div
            id="menu-chat"
            className="fixed bottom-0 bg-[#128c7e] py-2 flex w-full md:w-9/12 lg:w-1/2 mx-auto container justify-around"
            dir="rtl"
          >
            <Link
              to={"/"}
              className="flex flex-col justify-center items-center"
            >
              <BsChatLeftDotsFill color="white" size={"24px"} />
              <div className="text-sm text-white">چت</div>
            </Link>
            <Link
              to={"/profile"}
              className="flex flex-col justify-center items-center"
            >
              <CgProfile color="white" size={"24px"} />
              <div className="text-sm text-white">پروفایل</div>
            </Link>
          </div>
        </div>
      )
    } else {
      return window.location.replace("/login")
    }
  } else {
    return (
      <div className="flex justify-center items-center  h-screen w-full">
        <Loading />
      </div>
    )
  }
}
