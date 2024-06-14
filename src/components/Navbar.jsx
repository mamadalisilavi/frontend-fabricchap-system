
import { FaCircleUser } from "react-icons/fa6";
import Cookies from "js-cookie"

import { useEffect, useState } from "react"
import api from "../api"
import Loading from "../components/Loading"
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function Navbar() {
    const [show, setShow] = useState(false)
    const [MouseDown, setMouseDown] = useState(false)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    function handleShowMenu() {
      return setShow(!show)
    }
    function handleCloseMenu() {
      return MouseDown ? null : setShow(false)
    }

    function handleLogout() {
      Cookies.remove("jht4")
      window.location.reload()
    }
    async function getUser() {
      return await api
        .get("user", {
          headers: { Authorization: "Bearer " + Cookies.get("jht4") },
        })
        .then((e) => {
          setUser(e.data.user)
          setLoading(true)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  
    useEffect(() => {
      getUser()
    }, [MouseDown])
  return (
    <div className="flex justify-between fixed w-full md:w-9/12 lg:w-1/2  mx-auto container top-0 items-center py-3 bg-cyan-900  ">
        
        <div className="text-white font-bold text-xl pl-5">Fabricchap</div>
        <div className="m-1 gap-2 flex items-center">

        {loading ? (
            <div className="text-white">
              <div className="text-sm text-right">{user.name}</div>
              <div className=" text-xs">{user.number}</div>
            </div>
          ) : (
            <Loading />
          )}
        <button onClick={handleShowMenu} onBlur={handleCloseMenu} className="mr-5 focus:outline-none focus:ring focus:ring-cyan-600 focus:rounded-full w-7 "><FaCircleUser className="text-white hover:text-gray-200 transition-colors" size={"28px"} /></button>
        <div
          id="dropdownDots" 
       
          className={
            (show ? " " : "hidden") +
            " bg-stone-100 absolute top-14 right-4 rounded p-2 text-stone-900 shadow-md"
          }
        >
          <ul className="flex flex-col gap-2" onMouseDown={()=> setMouseDown(true)} onMouseLeave={()=>  setMouseDown(false)}>
          {loading ? (
          user.admin === 1 ? (
            <Link
              className="bg-green-500 flex gap-2 justify-center items-center hover:bg-green-800  text-white px-4 py-2 rounded-xl"
              to="/admin/dashboard"
            >
              رفتن به صفحه ادمین
            </Link>
          ) : null
        ) : (
          <Loading />
        )}
          <Link
          to={"/chinge-password"}
          className="bg-blue-500 flex gap-2 justify-center items-center hover:bg-blue-800  text-white px-4 py-2 rounded-xl"
        >
          تغییر گذرواژه
        </Link>
          <button
          onClick={handleLogout}
          className="bg-red-500 flex gap-2 justify-center items-center hover:bg-red-800  text-white px-4 py-2 rounded-xl"
        >
          <CiLogout size={"24px"} />
          خروج از حساب
        </button>
          </ul>
          {/* <ul class="py-4 px-2 text-base text-left flex flex-col  gap-3">
            <a href="https://eitaa.com/fabricchapadmin">ایتا</a>

            <a href="https://wa.me/+989162200380">واتساپ</a>

            <a href="https://t.me/fabricchapadmin">تلگرام</a>
          </ul> */}
        </div>
        </div>
    </div>
  )
}
