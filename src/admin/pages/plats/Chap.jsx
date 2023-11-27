import NavPlats from "../../components/NavPlats"

import { Link } from "react-router-dom"
export default function Chap() {
  return (
    <div>
      <NavPlats title={"امور چاپ"} back={"/admin"} />
      <div className="grid grid-cols-3 mt-3 mx-auto gap-3 w-[25rem]">
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-cyan-500"
          to="/admin/print-manager"
        >
          مدیریت چاپ
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-orange-500"
          to="/admin/plats"
        >
          پلات ها
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-rose-500"
          to="/admin/celender"
        >
          کلندر
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-yellow-500"
          to="/admin/sewing"
        >
          امور خیاطی
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-teal-500"
          to="/admin/posts"
        >
          امور ارسال
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-green-600"
          to="/admin/finished"
        >
          اتمام شده
        </Link>
      </div>
    </div>
  )
}
