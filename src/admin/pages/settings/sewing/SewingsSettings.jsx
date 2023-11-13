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
      .get("sewings", {
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
  return (
    <div
      dir="rtl"
      className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
    >
      <NavSettings title={"دوخت ها"} back={"/admin/settings"} />
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                نوع دوخت
              </th>
              <th scope="col" class="px-6 py-3">
                قیمت (تومان)
              </th>
              <th scope="col" class="px-6 py-3">
                ویرایش
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? sewings.map((sewing) => {
                  return (
                    <tr class="odd:bg-white even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {sewing.name}
                      </th>
                      <td class="px-6 py-4">
                        {sewing.price.toLocaleString("en-US")}
                      </td>
                      <td class="px-6 py-4">
                        <button
                          onClick={() => handleEdit(sewing.id)}
                          className="flex gap-3"
                        >
                          <Link
                            to="edit"
                            class="font-medium text-blue-600  hover:underline"
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
