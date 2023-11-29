import Cookies from "js-cookie"
import MainPage from "./MainPage"
import { useEffect, useState } from "react"
import api from "../api"
import Loading from "../components/Loading"
import { Link } from "react-router-dom"
import { CiLogout } from "react-icons/ci"
export default function Profile() {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)
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
  }, [])
  return (
    <MainPage>
      <div className="flex flex-col items-center">
        <nav className="w-full py-5 text-white bg-[#075e54] flex justify-center items-center text-xl font-semibold">
          پروفایل
        </nav>
        <div>
          {loading ? (
            <div className="text-center">
              <div className="text-xl font-bold mb-2 mt-4">{user.name}</div>
              <div className="text-sm ">{user.number}</div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
        {loading ? (
          user.admin === 1 ? (
            <Link
              className="flex justify-center bg-green-500 hover:bg-green-800  text-white rounded-xl my-3 mx-2 text-base font-bold py-3 w-9/12 md:w-max md:px-14"
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
          className="flex justify-center bg-blue-500 hover:bg-blue-800  text-white rounded-xl my-3 mx-2 text-base font-bold py-3 w-9/12 md:w-max md:px-14"
        >
          تغییر گذرواژه
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 flex gap-2 items-center hover:bg-red-800  text-white rounded-xl my-3 mx-2 text-base font-bold py-3 w-9/12 md:w-max md:px-14"
        >
          <CiLogout size={"24px"} />
          خروج از حساب
        </button>
        <div className="absolute bottom-20 text-gray-500 text-center">
          © {new Date().getFullYear()}{" "}
          <a
            className="text-blue-400 hover:underline"
            href="https://www.fabricchap.com"
          >
            Fabricchap
          </a>
          . All Rights Reserved.
          <div className="">تمام حقوق محفوظ است</div>
          <div className="my-2">
            <span>طراحی شده توسط </span>
            <a
              className="mx-1 text-blue-400 hover:underline"
              href="tel:+989025297933"
            >
              محمد سیلاوی
            </a>
          </div>
        </div>
      </div>
    </MainPage>
  )
}
