import moment from "jalali-moment"
import { Link } from "react-router-dom"
import NavAdmin from "../../components/NavAdmin"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
export default function Celender() {
  const [celenders, setCelenders] = useState()
  const [loading, setLoading] = useState(false)
  const [click, setClick] = useState(0)
  async function getPlats() {
    return await api
      .get("celender", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setCelenders(e.data.celender)
        setLoading(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  async function ActiveCelender(id) {
    return await api
      .post(
        "celender/activeCelender",
        { id },
        {
          headers: { Authorization: "Bearer " + Cookies.get("jht4") },
        }
      )
      .then((e) => {
        setClick(click + 1)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getPlats()
  }, [click])
  return (
    <div>
      <NavAdmin title={"کلندر"} back={"/admin/chap"} color={"bg-rose-500"} />
      <div
        dir="rtl"
        className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
      >
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3"></th>
                <th scope="col" class="px-6 py-3">
                  عکس
                </th>
                <th scope="col" class="px-6 py-3">
                  نام یا کد فایل
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
                  تاریخ
                </th>
                <th scope="col" class="px-6 py-3">
                  نام کاربر
                </th>
                <th scope="col" class="px-6 py-3">
                  تلفن کاربر
                </th>
                <th scope="col" class="px-6 py-3">
                  ویرایش
                </th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? celenders.map((celender) => {
                    return (
                      <tr class="odd:bg-white even:bg-gray-50  border-b ">
                        {/* <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        ></th> */}

                        <td class="px-6 py-4 flex flex-col">
                          <a
                            href={
                              process.env.REACT_APP_API_STORAGE + celender.file
                            }
                            download={true}
                            className="hover:underline text-xs text-white bg-blue-500 rounded px-2 py-1"
                          >
                            دانلود عکس
                          </a>
                          <span className="text-xs">
                            {celender.image_height +
                              "px" +
                              "*" +
                              celender.image_width +
                              "px"}
                          </span>
                          <span className="text-xs">
                            {celender.file_size}MB
                          </span>
                        </td>

                        <td class="px-6 py-4">
                          <img
                            id="theImage"
                            loading="lazy"
                            width={"70px"}
                            className="p-1 rounded"
                            src={
                              process.env.REACT_APP_API_STORAGE +
                              "resize/" +
                              celender.file
                            }
                            alt=""
                          />
                        </td>
                        <td class="px-6 py-4">{celender.file_name}</td>
                        <td class="px-6 py-4">{celender.size_x}</td>
                        <td class="px-6 py-4">{celender.size_y}</td>
                        <td class="px-6 py-4">{celender.fabric_plats.name}</td>
                        <td class="px-6 py-4">{celender.count}</td>
                        <td class="px-6 py-4">{celender.pieces} </td>
                        <td class="px-6 py-4">
                          {celender.backforth === 1 ? "پشت و رو" : ""}
                        </td>
                        <td class="px-6 py-4">
                          {moment(celender.created_at, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </td>
                        <td class="px-6 py-4">{celender.user.name} </td>
                        <td class="px-6 py-4">{celender.user.number} </td>
                        <td class="px-6 py-4">
                          <button
                            onClick={() => ActiveCelender(celender.id)}
                            className="flex gap-3"
                          >
                            {celender.status === 1 ? (
                              <div className="bg-red-500 rounded px-3 py-1.5 text-white text-center">
                                کلندر نشده
                              </div>
                            ) : (
                              <div className="bg-green-500 rounded px-3 py-1.5 text-white text-center">
                                کلندر شده
                              </div>
                            )}
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
