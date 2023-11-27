import moment from "jalali-moment"
import { Link } from "react-router-dom"
import NavAdmin from "../../components/NavAdmin"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
export default function Finished() {
  const [finished, setFinished] = useState()
  const [loading, setLoading] = useState(false)
  const [click, setClick] = useState(0)
  async function getPlats() {
    return await api
      .get("admin/finished", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setFinished(e.data.finished)
        setLoading(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  async function Delete(id) {
    if (window.confirm("حذف فایل؟")) {
      return await api
        .post(
          "admin/file/delete",
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
  }

  useEffect(() => {
    getPlats()
  }, [click])
  return (
    <div>
      <NavAdmin
        title={"اتمام شده"}
        back={"/admin/chap"}
        color={"bg-green-600"}
      />
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
                  نوع دوخت
                </th>
                <th scope="col" class="px-6 py-3">
                  طول و عرض
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
                  توضیحات
                </th>
                <th scope="col" class="px-6 py-3">
                  ویرایش
                </th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? finished.map((finished) => {
                    return (
                      <tr class="odd:bg-white even:bg-gray-50  border-b ">
                        {/* <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        ></th> */}

                        <td class="px-6 py-4 flex flex-col">
                          <a
                            href={
                              process.env.REACT_APP_API_STORAGE + finished.file
                            }
                            download={true}
                            className="hover:underline text-xs text-white bg-blue-500 rounded px-2 py-1"
                          >
                            دانلود عکس
                          </a>
                          <span className="text-xs">
                            {finished.image_height +
                              "px" +
                              "*" +
                              finished.image_width +
                              "px"}
                          </span>
                          <span className="text-xs">
                            {finished.file_size}MB
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
                              finished.file
                            }
                            alt=""
                          />
                        </td>
                        <td class="px-6 py-4">{finished.file_name}</td>
                        <td class="px-6 py-4">{finished.sewing.name}</td>
                        <td class="px-6 py-4">
                          {finished.size_x}x{finished.size_y}
                        </td>
                        <td class="px-6 py-4">{finished.fabric_plats.name}</td>
                        <td class="px-6 py-4">{finished.count}</td>
                        <td class="px-6 py-4">{finished.pieces} </td>
                        <td class="px-6 py-4">
                          {finished.backforth === 1 ? "پشت و رو" : ""}
                        </td>
                        <td class="px-6 py-4">
                          {moment(finished.created_at, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </td>
                        <td class="px-6 py-4">{finished.user.name} </td>
                        <td class="px-6 py-4">{finished.user.number} </td>
                        <td class="px-6 py-4">{finished.description} </td>
                        <td class="px-6 py-4">
                          <button
                            onClick={() => Delete(finished.id)}
                            className="flex gap-3"
                          >
                            <div className="bg-red-500 rounded px-3 py-1.5 text-white text-center">
                              حذف
                            </div>
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
