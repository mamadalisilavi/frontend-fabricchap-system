import { Link, NavLink } from "react-router-dom"
import { GoHomeFill } from "react-icons/go"
import { FaListCheck, FaUserLarge } from "react-icons/fa6"
import { useState } from "react"
import Cookies from "js-cookie"
import { useEffect } from "react"
import api from "../api"
import Loading from "../components/Loading"
import Navbar from './../components/Navbar';
import { IoMdPricetags } from "react-icons/io"
import { AiFillProduct } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi"
import { HiDocumentPlus } from "react-icons/hi2"
import { FaInfoCircle } from "react-icons/fa"
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
          <Navbar />
          <div>{children}</div>
          <div
            id="menu-chat"
            className="fixed bottom-0 bg-cyan-950  flex w-full md:w-9/12 lg:w-1/2 mx-auto container justify-around"
            dir="rtl"
          >
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? " flex flex-col justify-center items-center text-white mb-2 pt-2" : "flex flex-col justify-center items-center py-2 text-stone-400"
              }
            >
              <HiDocumentPlus size={"22px"} />
              <div className="text-xs ms:text-sm">ثبت سفارش</div>
            </NavLink>
            <NavLink
              to="/list-chaps"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? " flex flex-col justify-center items-center text-white mb-2 pt-2" : "flex flex-col justify-center items-center py-2 text-stone-400"
              }
            >
              <FaListCheck size={"22px"} />
              <div className="text-xs ms:text-sm">لیست سفارشات</div>
            </NavLink>
             <NavLink
              to="/prices"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? " flex flex-col justify-center items-center text-white mb-2 pt-2" : "flex flex-col justify-center items-center py-2 text-stone-400"
              }
            >
              <IoMdPricetags size={"22px"} />
              <div className="text-xs ms:text-sm">لیست قیمت ها</div>
            </NavLink>
             <NavLink
              to="/products"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? " flex flex-col justify-center items-center text-white mb-2 pt-2" : "flex flex-col justify-center items-center py-2 text-stone-400"
              }
            >
              <BiSolidCategory size={"22px"} />
              <div className="text-xs ms:text-sm">لیست محصولات</div>
            </NavLink>
             <NavLink
              to="/info"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? " flex flex-col justify-center items-center text-white mb-2 pt-2" : "flex flex-col justify-center items-center py-2 text-stone-400"
              }
            >
              <FaInfoCircle size={"22px"} />
              <div className="text-xs ms:text-sm">تماس با ما</div>
            </NavLink>
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
