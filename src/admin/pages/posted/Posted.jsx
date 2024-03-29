import moment from "jalali-moment"
import { Link } from "react-router-dom"
import NavAdmin from "../../components/NavAdmin"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
export default function Posted() {
  const [posted, setPosted] = useState()
  const [loading, setLoading] = useState(false)
  const [click, setClick] = useState(0)
  async function getPlats() {
    return await api
      .get("admin/posted", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setPosted(e.data.posted)
        setLoading(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  async function ActivePosted(id) {
    return await api
      .post(
        "admin/posted/activePosted",
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
      <NavAdmin
        title={"امور ارسال"}
        back={"/admin/chap"}
        color={"bg-teal-500"}
      />
      <div
        dir="rtl"
        className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
      >
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  عکس
                </th>
                <th scope="col" className="px-6 py-3">
                  نام یا کد فایل
                </th>
                <th scope="col" className="px-6 py-3">
                  طول
                </th>
                <th scope="col" className="px-6 py-3">
                  عرض
                </th>
                <th scope="col" className="px-6 py-3">
                  پارچه
                </th>
                <th scope="col" className="px-6 py-3">
                  تعداد
                </th>
                <th scope="col" className="px-6 py-3">
                  تاریخ
                </th>
                <th scope="col" className="px-6 py-3">
                  نام کاربر
                </th>
                <th scope="col" className="px-6 py-3">
                  تلفن کاربر
                </th>
                <th scope="col" className="px-6 py-3">
                  توضیحات
                </th>
                <th scope="col" className="px-6 py-3">
                  ویرایش
                </th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? posted.map((post) => {
                    return (
                      <tr className="odd:bg-white even:bg-gray-50  border-b ">
                        {/* <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        ></th> */}

                        <td className="px-6 py-4 flex flex-col">
                          <a
                            href={process.env.REACT_APP_API_STORAGE + post.file}
                            download={true}
                            className="hover:underline text-xs text-white bg-blue-500 rounded px-2 py-1"
                          >
                            دانلود
                          </a>
                          {/* <span className="text-xs">
                            {post.image_height +
                              "px" +
                              "*" +
                              post.image_width +
                              "px"}
                          </span> */}
                          <span className="text-xs">{post.file_size}MB</span>
                        </td>

                        <td className="px-6 py-4">
                          <img
                            id="theImage"
                            loading="lazy"
                            width={"70px"}
                            className="p-1 rounded"
                            src={
                              process.env.REACT_APP_API_STORAGE +
                              "resize/" +
                              post.file
                            }
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4">{post.file_name}</td>
                        <td className="px-6 py-4">{post.size_x}</td>
                        <td className="px-6 py-4">{post.size_y}</td>
                        <td className="px-6 py-4">{post.fabric_plats.name}</td>
                        <td className="px-6 py-4">{post.count}</td>
                        <td className="px-6 py-4">
                          {moment(post.created_at, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </td>
                        <td className="px-6 py-4">{post.user.name} </td>
                        <td className="px-6 py-4">{post.user.number} </td>
                        <td className="px-6 py-4">{post.description} </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => ActivePosted(post.id)}
                            className="flex gap-3"
                          >
                            {post.status === 3 ? (
                              <div className="bg-red-500 rounded px-3 py-1.5 text-white text-center">
                                ارسال نشده
                              </div>
                            ) : (
                              <div className="bg-green-500 rounded px-3 py-1.5 text-white text-center">
                                ارسال شده
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
