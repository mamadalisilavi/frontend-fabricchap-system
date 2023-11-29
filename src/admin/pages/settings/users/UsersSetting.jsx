import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import NavSettings from "../../../components/NavSettings"
import api from "../../../../api"
import { FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"
export default function UsersSettings() {
  const [users, setUsers] = useState()
  const [loading, setLoading] = useState(false)
  async function getSewings() {
    return await api
      .get("admin/users", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setUsers(e.data)
        setLoading(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  function handleEdit(id) {
    return window.localStorage.setItem("user_edit_id", id)
  }
  useEffect(() => {
    getSewings()
  }, [])

  return (
    <div
      dir="rtl"
      className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
    >
      <NavSettings title={"کابران"} back={"/admin/settings"} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام کاربر
              </th>
              <th scope="col" className="px-6 py-3">
                شماره تلفن
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت
              </th>
              <th scope="col" className="px-6 py-3">
                ویرایش
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? users.map((user) => {
                  return (
                    <tr className="odd:bg-white even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {user.name}
                      </th>
                      <td className="px-6 py-4">{user.number}</td>
                      <td className="px-6 py-4">
                        {user.customer === 1 ? "مشتری" : "همکار"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(user.number)}
                          className="flex gap-3"
                        >
                          <Link
                            to="edit"
                            className="font-medium text-blue-600  hover:underline"
                          >
                            ویرایش
                          </Link>
                        </button>
                      </td>
                    </tr>
                  )
                })
              : "loading..."}
          </tbody>
        </table>
      </div>
    </div>
  )
}
