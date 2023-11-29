import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import NavSettings from "../../../components/NavSettings"
import api from "../../../../api"

export default function EditUser() {
  const [data, setData] = useState({
    name: null,
    customer: null,
    password: "",
    admin: null,
    active: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [click, setClick] = useState("")
  const number = Boolean(window.localStorage.getItem("user_edit_id"))
    ? window.localStorage.getItem("user_edit_id")
    : window.location.replace("/admin/settings/users")
  async function handleSubmit(e) {
    e.preventDefault()
    return api
      .post(
        "admin/user/update",
        {
          number: number,
          name: data.name,
          password: data.password,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        console.log(e)
        if (e.status) {
          //window.localStorage.remove("user_edit_id")
          // return window.location.replace("/admin/settings/users")
          setSuccess("نام / گذرواژه با موفقیت تغییر شد.")
        }
      })
      .catch((e) => setError(e.response.data.message))
  }
  async function getUser() {
    return api
      .post(
        "admin/user/edit",
        {
          number: number,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        setLoading(true)
        setData(e.data.user)
      })
      .catch((e) => console.log(e))
  }
  async function DeleteUser(e) {
    e.preventDefault()
    if (window.confirm("حذف کاربر؟")) {
      return api
        .post(
          "admin/user/delete",
          {
            number: number,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
        )
        .then((e) => {
          window.localStorage.removeItem("user_edit_id")
          window.location.replace("/admin/settings/users")
        })
        .catch((e) => console.log(e))
    }
  }
  async function Active(e) {
    e.preventDefault()
    return api
      .post(
        "admin/user/active",
        {
          number: number,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        setClick(click + 1)
      })
      .catch((e) => console.log(e))
  }
  async function Customer(e) {
    e.preventDefault()
    return api
      .post(
        "admin/user/customer",
        {
          number: number,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        setClick(click + 1)
      })
      .catch((e) => console.log(e))
  }
  async function Admin(e) {
    e.preventDefault()
    return api
      .post(
        "admin/user/admin",
        {
          number: number,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        setClick(click + 1)
      })
      .catch((e) => console.log(e))
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }
  useEffect(() => {
    getUser()
    //eslint-disable-next-line
  }, [click])
  if (loading) {
    return (
      <div className="container mx-auto md:w-2/3 lg:1/2 flex flex-col justify-center items-center">
        <NavSettings
          title={"ویرایش اطلاعات کاربر"}
          back={"/admin/settings/users"}
        />
        <div className="text-green-600">{success}</div>
        <div className="text-red-600">{error}</div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full md:w-1/3 px-4 gap-4"
          dir="rtl"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              نام کاربر
            </label>
            <input
              onChange={handleInputChange}
              value={data.name}
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="نام کاربر"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              گذرواژه جدید
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="گذرواژه جدید "
            />
            <div className="text-stone-500">
              در صورت تغییر نام کاربر در قسمت گذرواژه ، گذرواژه قدیمی یا جدید
              وارد کنید
            </div>
          </div>
          <button className="bg-blue-600 rounded w-full text-white py-3">
            ویرایش
          </button>

          {data.active === 1 ? (
            <button
              onClick={Active}
              className="bg-green-600 rounded w-full text-white py-3 mt-2 block"
            >
              فعال
            </button>
          ) : (
            <button
              onClick={Active}
              className="bg-red-600 rounded w-full text-white py-3 mt-2 block"
            >
              غیر فعال
            </button>
          )}
          {data.admin === 0 ? (
            <button
              onClick={Admin}
              className="bg-orange-500 rounded w-full text-white py-3 mt-2 block"
            >
              تبدیل به ادمین
            </button>
          ) : (
            <button
              onClick={Admin}
              className="bg-blue-400 rounded w-full text-white py-3 mt-2 block"
            >
              تبدیل به کاربر
            </button>
          )}
          {data.customer === 0 ? (
            <button
              onClick={Customer}
              className="bg-teal-600 rounded w-full text-white py-3 mt-2 block"
            >
              همکار
            </button>
          ) : (
            <button
              onClick={Customer}
              className="bg-purple-600 rounded w-full text-white py-3 mt-2 block"
            >
              مشتری
            </button>
          )}
          <button
            onClick={DeleteUser}
            className="bg-red-600 rounded w-full text-white py-3 mt-2 block"
          >
            حذف
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        لطفا صبر کنید...
      </div>
    )
  }
}
