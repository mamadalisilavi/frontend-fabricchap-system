import { useState } from "react"
// import Cookies from "js-cookie"
// import { useEffect } from "react"
// import api from "../../api"
import { Link } from "react-router-dom"
import { BiLinkExternal } from "react-icons/bi"
import { IoMdSettings } from "react-icons/io"
import { LuNetwork } from "react-icons/lu"
export default function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  //   useEffect(() => {
  //     if (Boolean(Cookies.get("jht4"))) {
  //       async function checkToken() {
  //         return await api
  //           .get("isAdmin", {
  //             headers: { Authorization: "Bearer " + Cookies.get("jht4") },
  //           })
  //           .then((e) => {
  //             if (e.data.status) {
  //               setLoading(true)
  //               setIsAdmin(true)
  //             } else {
  //               setLoading(true)
  //               setIsAdmin(false)
  //             }
  //           })
  //           .catch((e) => {
  //             setLoading(true)
  //             setIsAdmin(false)
  //           })
  //       }
  //       checkToken()
  //     } else {
  //       setLoading(true)
  //       setIsAdmin(false)
  //     }
  //   }, [])

  //   if (loading) {
  //     if (isAdmin) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center" dir="rtl">
      <div className="bg-slate-600  flex items-center justify-between w-full p-5 container">
        <div className="text-white font-bold text-xl">داشبورد</div>
        <Link
          to="/"
          className="flex gap-1 text-sm items-center  text-white underline hover:text-blue-600 hover:underline"
        >
          صفحه اصلی
          <BiLinkExternal />
        </Link>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center ">
        <Link
          className="flex gap-1 justify-center items-center w-72 h-16 rounded-lg text-lg text-white bg-blue-600 hover:bg-blue-800 hover:-translate-y-1 transition-all duration-500 "
          to="/admin/chap"
        >
          امور چاپ
          <LuNetwork />
        </Link>
        <Link
          className="flex gap-1 justify-center items-center w-72 h-16 rounded-lg text-lg text-white bg-green-600 hover:bg-green-800 hover:-translate-y-1 transition-all duration-500 "
          to="/admin/finance"
        >
          امور مالی
          <LuNetwork />
        </Link>
        <Link
          className="flex gap-1 justify-center items-center w-72 h-16 rounded-lg text-lg text-white bg-blue-800 hover:bg-blue-900 hover:-translate-y-1 transition-all duration-500"
          to="/admin/settings"
        >
          تنظیمات
          <IoMdSettings />
        </Link>
        {/* <Link
              className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-green-600"
              to="/admin/finance"
            >
              امور مالی
            </Link> */}
      </div>
      <div className="flex flex-col  md:flex-row items-center justify-center"></div>
      <div className="flex flex-col  md:flex-row items-center justify-center"></div>
    </div>
  )
  //     } else {
  //       return window.location.replace("/")
  //     }
  //   } else {
  //     return <div>loading</div>
  //   }
}
