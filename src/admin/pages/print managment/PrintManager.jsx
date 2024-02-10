import moment from "jalali-moment"
import { Link } from "react-router-dom"
import NavAdmin from "../../components/NavAdmin"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
export default function PrintManager() {
  const [plats, setPlats] = useState()
  const [loading, setLoading] = useState(false)
  async function getPlats() {
    return await api
      .get("printManager", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setPlats(e.data.prints)
        setLoading(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getPlats()
  }, [])

  const [sumFabrics, setSumfabrics] = useState([])
  const [date, setDate] = useState()
  useEffect(() => {
    setDate(new Date())
  }, [])
  useEffect(() => {
    if (loading) {
      plats.map((e) =>
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
      <NavAdmin
        title={"مدیریت چاپ"}
        back={"/admin/chap"}
        color={"bg-cyan-500"}
      />
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
                <div className="">{parseInt(item.count) / 100}متر</div>
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
                  حالت
                </th>
                {/* <th scope="col" className="px-6 py-3">
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
                  کاربر
                </th>
                <th scope="col" className="px-6 py-3">
                  شماره تماس
                </th> */}
                <th scope="col" className="px-6 py-3">
                  تاریخ
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  ویرایش
                </th> */}
              </tr>
            </thead>
            <tbody>
              {loading
                ? plats.map((plat) => {
                    return (
                      <tr className="odd:bg-white even:bg-gray-50  border-b ">
                        {/* <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        ></th> */}

                        <td className="px-6 py-4 flex flex-col">
                          <a
                            href={process.env.REACT_APP_API_STORAGE + plat.file}
                            download
                            className="hover:underline text-xs text-white bg-blue-500 rounded px-2 py-1"
                          >
                            دانلود
                          </a>
                          {/* <span className="text-xs">
                            {plat.image_height +
                              "px" +
                              "*" +
                              plat.image_width +
                              "px"}
                          </span> */}
                          <span className="text-xs">{plat.file_size}MB</span>
                        </td>

                        <td className="px-6 py-4">
                          <Link
                            className="underline hover:text-blue-600"
                            to={"" + plat.id}
                          >
                            <img
                              id="theImage"
                              loading="lazy"
                              width={"70px"}
                              className="p-1 rounded"
                              src={
                                process.env.REACT_APP_API_STORAGE +
                                "resize/" +
                                plat.file
                              }
                              alt=""
                            />
                          </Link>
                        </td>

                        <td className="px-6 py-4">
                          <Link
                            className="underline hover:text-blue-600"
                            to={"" + plat.id}
                          >
                            {" "}
                            {plat.file_name}{" "}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          {plat.active === 0 ? (
                            <div className="bg-red-500 rounded px-3 py-1.5 text-white text-center">
                              <Link className="" to={"" + plat.id}>
                                غیر فعال
                              </Link>
                            </div>
                          ) : (
                            <div className="bg-green-500 rounded px-3 py-1.5 text-white text-center">
                              {" "}
                              فعال
                            </div>
                          )}
                        </td>
                        {/* <td className="px-6 py-4">{plat.size_x}</td>
                        <td className="px-6 py-4">{plat.size_y}</td>
                        <td className="px-6 py-4">{plat.fabric_plats.name}</td>
                        <td className="px-6 py-4">{plat.count}</td>
                        <td className="px-6 py-4">{plat.user.name} </td>
                        <td className="px-6 py-4">{plat.user.number}</td> */}
                        <td className="px-6 py-4">
                          {moment(plat.created_at, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </td>
                        {/* <td className="px-6 py-4">
                          <button onClick={() => ""} className="flex gap-3">
                            <Link
                              to="edit"
                              className="font-medium text-blue-600  hover:underline"
                            >
                              ویرایش
                            </Link>
                          </button>
                        </td> */}
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
