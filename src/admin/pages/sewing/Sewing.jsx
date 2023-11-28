import moment from "jalali-moment"
import { Link } from "react-router-dom"
import NavAdmin from "../../components/NavAdmin"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
export default function Sewing() {
  const [sewings, setSewings] = useState()
  const [loading, setLoading] = useState(false)
  const [click, setClick] = useState(0)
  async function getPlats() {
    return await api
      .get("admin/sewings", {
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
  async function ActiveSewing(id) {
    return await api
      .post(
        "admin/sewings/activeSewing",
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
  const [sumFabrics, setSumfabrics] = useState([])
  const [date, setDate] = useState()
  useEffect(() => {
    setDate(new Date())
  }, [])
  useEffect(() => {
    if (loading) {
      sewings.map((e) =>
        setSumfabrics((prev) => [
          ...prev,
          { fabric: e.fabric_plats.name, count: e.size_y },
        ])
      )
    }

    // console.log(all)
  }, [date, loading])
  const groupAndSumFabricCounts = (fabricArray) => {
    return Object.values(
      fabricArray.reduce((acc, fabricObj) => {
        const fabricName = fabricObj.fabric
        const fabricCount = fabricObj.count

        if (!acc[fabricName]) {
          acc[fabricName] = { fabric: fabricName, count: 0 }
        }

        acc[fabricName].count += fabricCount

        return acc
      }, {})
    )
  }
  const resultArray = groupAndSumFabricCounts(sumFabrics)
  return (
    <div>
      <NavAdmin title={"خیاطی"} back={"/admin/chap"} color={"bg-yellow-500"} />
      <div
        dir="rtl"
        className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
      >
        <div className="flex">
          <div className="flex">
            {resultArray.map((item, index) => (
              <div
                className="bg-blue-500 m-3 text-white rounded-lg p-4 text-center"
                key={index}
              >
                <div className="font-bold">{item.fabric}</div>
                <div className="">{item.count}سانت</div>
              </div>
            ))}
          </div>
        </div>
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
                  نوع دوخت
                </th>
                <th scope="col" className="px-6 py-3">
                  طول و عرض
                </th>
                <th scope="col" className="px-6 py-3">
                  پارچه
                </th>
                <th scope="col" className="px-6 py-3">
                  تعداد
                </th>
                <th scope="col" className="px-6 py-3">
                  تیکه
                </th>
                <th scope="col" className="px-6 py-3">
                  پشت و رو
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
                ? sewings.map((sewing) => {
                    return (
                      <tr className="odd:bg-white even:bg-gray-50  border-b ">
                        {/* <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        ></th> */}

                        <td className="px-6 py-4 flex flex-col">
                          <a
                            href={
                              process.env.REACT_APP_API_STORAGE + sewing.file
                            }
                            download={true}
                            className="hover:underline text-xs text-white bg-blue-500 rounded px-2 py-1"
                          >
                            دانلود عکس
                          </a>
                          <span className="text-xs">
                            {sewing.image_height +
                              "px" +
                              "*" +
                              sewing.image_width +
                              "px"}
                          </span>
                          <span className="text-xs">{sewing.file_size}MB</span>
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
                              sewing.file
                            }
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4">{sewing.file_name}</td>
                        <td className="px-6 py-4">{sewing.sewing.name}</td>
                        <td className="px-6 py-4">
                          {sewing.size_x}x{sewing.size_y}
                        </td>
                        <td className="px-6 py-4">{sewing.fabric_plats.name}</td>
                        <td className="px-6 py-4">{sewing.count}</td>
                        <td className="px-6 py-4">{sewing.pieces} </td>
                        <td className="px-6 py-4">
                          {sewing.backforth === 1 ? "پشت و رو" : ""}
                        </td>
                        <td className="px-6 py-4">
                          {moment(sewing.created_at, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </td>
                        <td className="px-6 py-4">{sewing.user.name} </td>
                        <td className="px-6 py-4">{sewing.user.number} </td>
                        <td className="px-6 py-4">{sewing.description} </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => ActiveSewing(sewing.id)}
                            className="flex gap-3"
                          >
                            {sewing.status === 2 ? (
                              <div className="bg-red-500 rounded px-3 py-1.5 text-white text-center">
                                دوخت نشده
                              </div>
                            ) : (
                              <div className="bg-green-500 rounded px-3 py-1.5 text-white text-center">
                                دوخت شده
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
