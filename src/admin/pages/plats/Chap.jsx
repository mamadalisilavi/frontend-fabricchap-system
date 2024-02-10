import NavPlats from "../../components/NavPlats"

import { Link } from "react-router-dom"
export default function Chap() {
  return (
    <div>
      <NavPlats title={"امور چاپ"} back={"/admin/dashboard"} />
      <div className="grid grid-cols-3 mt-3 mx-auto gap-3 w-[25rem]">
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-cyan-500  hover:bg-cyan-700 hover:-translate-y-1 transition-all duration-300"
          to="/admin/print-manager"
        >
          مدیریت چاپ
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-orange-500  hover:bg-orange-700 hover:-translate-y-1 transition-all duration-300"
          to="/admin/plats"
        >
          پلات ها
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-rose-500  hover:bg-rose-700 hover:-translate-y-1 transition-all duration-300"
          to="/admin/celender"
        >
          کلندر
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-yellow-500  hover:bg-yellow-700 hover:-translate-y-1 transition-all duration-300"
          to="/admin/sewing"
        >
          امور خیاطی
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-teal-500  hover:bg-teal-700 hover:-translate-y-1 transition-all duration-300"
          to="/admin/posts"
        >
          امور ارسال
        </Link>
        <Link
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-green-600  hover:bg-green-700 hover:-translate-y-1 transition-all duration-300"
          to="/admin/finished"
        >
          اتمام شده
        </Link>
      </div>
    </div>
  )
}
