import { Link } from "react-router-dom"
import NavAdmin from "../../components/NavAdmin"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
export default function Plats() {
  const [plats, setPlats] = useState()
  const [loading, setLoading] = useState(false)
  async function getPlats() {
    return await api
      .get("plats", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setPlats(e.data.plats)
        setLoading(true)
        console.log(e)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getPlats()
  }, [])
  return (
    <div>
      <NavAdmin
        title={"پلات ها"}
        back={"/admin/chap"}
        color={"bg-orange-500"}
      />
      <div
        dir="rtl"
        className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
      >
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  عکس
                </th>
                <th scope="col" class="px-6 py-3">
                  نام چاپ
                </th>
                <th scope="col" class="px-6 py-3">
                  طول
                </th>
                <th scope="col" class="px-6 py-3">
                  عرض
                </th>
                <th scope="col" class="px-6 py-3">
                  پارچه
                </th>
                <th scope="col" class="px-6 py-3">
                  تعداد
                </th>
                <th scope="col" class="px-6 py-3">
                  تیکه
                </th>
                <th scope="col" class="px-6 py-3">
                  پشت و رو
                </th>
                <th scope="col" class="px-6 py-3">
                  ویرایش
                </th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? plats.map((plat) => {
                    return (
                      <tr class="odd:bg-white even:bg-gray-50  border-b ">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        ></th>
                        <td class="px-6 py-4">{plat.file_name}</td>
                        <td class="px-6 py-4">{plat.size_x}</td>
                        <td class="px-6 py-4">{plat.size_y}</td>
                        <td class="px-6 py-4">{plat.fabric_plats.name}</td>
                        <td class="px-6 py-4">{plat.count}</td>
                        <td class="px-6 py-4">{plat.pieces} </td>
                        <td class="px-6 py-4">
                          {plat.backforth === 1 ? "پشت و رو" : ""}
                        </td>
                        <td class="px-6 py-4">
                          <button onClick={() => ""} className="flex gap-3">
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
      </div>
    </div>
  )
}
