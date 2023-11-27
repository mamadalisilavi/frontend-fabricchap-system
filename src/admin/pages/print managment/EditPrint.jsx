import { useParams } from "react-router"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import moment from "jalali-moment"

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
    <div>
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
          <div className="">{print.file_name}</div>
          <div className="">{print.size_x}</div>
          <div className="">{print.size_y}</div>
          <div className="">{print.user.name}</div>
          <div className="">{print.user.number}</div>
          <div>{print.file_name}</div>
          <div>{print.fabric_plats.name}</div>
          <div>{print.count}تعداد</div>
          <div>{print.pieces}تیکه</div>
          <div>{print.backforth === 1 ? "پشت و رو" : ""}</div>

          {moment(print.created_at, "YYYY/MM/DD")
            .locale("fa")
            .format("YYYY/MM/DD")}
          <div>
            {print.description} <span>توضیحات</span>{" "}
          </div>
          <button
            onClick={Active}
            className={
              (print.active === 0 ? " bg-green-500 " : "  bg-red-600  ") +
              "px-24 py-2 text-lg rounded text-white"
            }
          >
            {print.active === 0 ? "فعال کردن" : "غیر فعال کردن"}
          </button>
          <button
            onClick={() => Delete(print.id)}
            className={" bg-red-600 px-24 py-2 text-lg rounded text-white my-4"}
          >
            حذف
          </button>
        </div>
      ) : (
        "loading.."
      )}
    </div>
  )
}
