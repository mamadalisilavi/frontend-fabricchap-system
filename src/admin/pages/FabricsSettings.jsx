import Cookies from "js-cookie"
import api from "../../api"
import { useEffect, useState } from "react"
import NavSettings from "../components/NavSettings"
import { FaPlus } from "react-icons/fa6"
import { Link } from "react-router-dom"
export default function FabricsSettings() {
  const [fabrics, setFabrics] = useState()
  const [loading, setLoading] = useState(false)
  async function getFabrics() {
    return await api
      .get("fabrics", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setFabrics(e.data.fabrics)
        setLoading(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  function handleEdit(id) {
    return window.localStorage.setItem("fabric_edit_id", id)
  }
  useEffect(() => {
    getFabrics()
  }, [])
  return (
    <div
      dir="rtl"
      className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
    >
      <NavSettings title={"پارچه ها"} back={"/admin/settings"} />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام پارچه
              </th>
              <th scope="col" className="px-6 py-3">
                عرض پارچه(سانتیمتر)
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت مشتری(تومان)
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت همکار(تومان)
              </th>
              <th scope="col" className="px-6 py-3">
                درصد تخفیف
              </th>
              <th scope="col" className="px-6 py-3">
                ویرایش
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? fabrics.map((fabric) => {
                  return (
                    <tr className="odd:bg-white even:bg-gray-50  border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {fabric.name}
                      </th>
                      <td className="px-6 py-4">{fabric.width}</td>
                      <td className="px-6 py-4">
                        {fabric.price.toLocaleString("en-US")}
                      </td>
                      <td className="px-6 py-4">
                        {fabric.price_partner.toLocaleString("en-US")}
                      </td>
                      <td className="px-6 py-4">%{fabric.percent}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEdit(fabric.id)}
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
        افزودن پارچه
        <FaPlus />
      </Link>
    </div>
  )
}
