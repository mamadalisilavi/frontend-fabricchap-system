import { useParams } from "react-router"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import moment from "jalali-moment"
import NavAdmin from "../../components/NavAdmin"

export default function EditPrint() {
  const { id } = useParams()
  const [print, setPrint] = useState()
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(0)
  async function getPlats() {
    return await api
      .get(`print/${id}`, {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setPrint(e.data.print)
        setLoading(true)
        console.log(e)
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
          window.location.replace("/admin/print-manager")
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
  useEffect(() => {
    getPlats()
  }, [active])

  async function Active() {
    return await api
      .post(
        "print/active",
        { id: id },
        {
          headers: { Authorization: "Bearer " + Cookies.get("jht4") },
        }
      )
      .then((e) => {
        setActive(active + 1)
        console.log(e)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <>
      <NavAdmin
        title={"اطلاعات فایل چاپی"}
        back={"/admin/print-manager"}
        color={"bg-cyan-500"}
      />

      <div dir="rtl">
        {loading ? (
          <div className="flex flex-col items-center">
            <img
              id="theImage"
              loading="lazy"
              width={"300px"}
              className=" mt-5"
              src={process.env.REACT_APP_API_STORAGE + "resize/" + print.file}
              alt=""
            />
            <a
              href={process.env.REACT_APP_API_STORAGE + print.file}
              download
              className="hover:underline inline-block text-white w-52 text-center bg-blue-600 rounded px-2 py-1 mt-2"
            >
              {print.file_size} MB دانلود
            </a>
            <div className="">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <tbody>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        نام یا کد فایل
                      </th>
                      <td class="px-6 py-4">{print.file_name}</td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        طول به سانتیمتر
                      </th>
                      <td class="px-6 py-4">{print.size_y}</td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        عرض به سانتیمتر
                      </th>
                      <td class="px-6 py-4">{print.size_x}</td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        نام کاربر
                      </th>
                      <td class="px-6 py-4">{print.user.name}</td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        شمارع تلفن
                      </th>
                      <td class="px-6 py-4">{print.user.number}</td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        نوع پارچه
                      </th>
                      <td class="px-6 py-4">{print.fabric_plats.name}</td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        تعداد
                      </th>
                      <td class="px-6 py-4">{print.count}</td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        تعداد تیکه فایل
                      </th>
                      <td class="px-6 py-4">{print.pieces}</td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        پشت و رو
                      </th>
                      <td class="px-6 py-4">
                        {print.backforth === 0 ? "بله" : "خیر"}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        تاریخ ارسال
                      </th>
                      <td class="px-6 py-4">
                        {moment(print.created_at, "YYYY/MM/DD")
                          .locale("fa")
                          .format("YYYY/MM/DD")}
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        توضیحات
                      </th>
                      <td class="px-6 py-4">{print.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={Active}
              className={
                (print.active === 0 ? " bg-green-500 " : "  bg-red-600  ") +
                "px-24 py-2 mt-4 text-lg rounded text-white"
              }
            >
              {print.active === 0 ? "فعال کردن" : "غیر فعال کردن"}
            </button>
            <button
              onClick={() => Delete(print.id)}
              className={
                " bg-red-600 px-24 py-2 text-lg rounded text-white my-4"
              }
            >
              حذف
            </button>
          </div>
        ) : (
          "loading.."
        )}
      </div>
    </>
  )
}
