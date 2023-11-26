import NavPlats from "../../components/NavPlats"

import { Link } from "react-router-dom"
export default function Chap() {
  return (
    <div>
      <NavPlats title={"امور چاپ"} back={"/admin"} />
      <div className="flex gap-2 items-center justify-center mt-3">
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
          className="flex justify-center items-center w-32 h-32 rounded-lg text-lg text-white bg-yellow-500"
          to="/admin/sewings"
        >
          امور خیاطی
        </Link>
      </div>
    </div>
  )
}
