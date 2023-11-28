import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import NavSettings from "../../../components/NavSettings"
import api from "../../../../api"
import { FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"
export default function SewingsSettings() {
  const [sewings, setSewings] = useState()
  const [loading, setLoading] = useState(false)
  async function getSewings() {
    return await api
      .get("sewings/admin", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setSewings(e.data.sewings)
        setLoading(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  function handleEdit(id) {
    return window.localStorage.setItem("sewing_edit_id", id)
  }
  useEffect(() => {
    getSewings()
  }, [])
  const sewingStatus = [
    { id: 1, name: "قطعی" },
    { id: 2, name: "کامل" },
    { id: 3, name: "یک طرفه" },
    { id: 4, name: "غیر موجود" },
  ]

  const getSewingStatus = (id) => {
    const foundObject = sewingStatus.find((item) => item.id === id)

    if (foundObject) {
      return foundObject.name
    } else {
      return "Not found" // You can handle the case where the id is not found
    }
  }
  return (
    <div
      dir="rtl"
      className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
    >
      <NavSettings title={"دوخت ها"} back={"/admin/settings"} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                نوع دوخت
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت (تومان)
              </th>
              <th scope="col" className="px-6 py-3">
                حالت
              </th>
              <th scope="col" className="px-6 py-3">
                ویرایش
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? sewings.map((sewing) => {
                  return (
                    <tr className="odd:bg-white even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {sewing.name}
                      </th>
                      <td className="px-6 py-4">
                        {sewing.price.toLocaleString("en-US")}
                      </td>
                      <td className="px-6 py-4">
                        {getSewingStatus(sewing.status)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(sewing.id)}
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
      <Link
        className="bg-blue-500 text-white w-9/12 md:w-1/3 rounded py-2 text-center mx-auto mt-4 flex gap-3 justify-center items-center"
        to="add"
      >
        افزودن دوخت
        <FaPlus />
      </Link>
    </div>
  )
}
