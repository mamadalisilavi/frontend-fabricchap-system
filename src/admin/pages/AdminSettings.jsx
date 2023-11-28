import { Link } from "react-router-dom"
import NavSettings from "../components/NavSettings"
import { RiFilePaper2Line } from "react-icons/ri"
import { AiFillSetting, AiFillQuestionCircle } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { GiSewingMachine } from "react-icons/gi"
export default function AdminSettings() {
  const settings = (
    <div className="flex gap-3 items-center">
      <AiFillSetting />
      تنظیمات
    </div>
  )
  return (
    <div>
      <NavSettings title={settings} back={"/admin/dashboard"} />
      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        <Link
          className=" border flex items-center gap-3 justify-center w-9/12 md:w-52 py-3 rounded"
          to="fabrics"
        >
          <RiFilePaper2Line />
          پارچه ها
        </Link>
        <Link
          className=" border flex items-center gap-3 justify-center w-9/12 md:w-52 py-3 rounded"
          to="sewings"
        >
          <GiSewingMachine />
          دوخت
        </Link>
        <Link
          className=" border flex items-center gap-3 justify-center w-9/12 md:w-52 py-3 rounded"
          to="fabrics"
        >
          <AiFillQuestionCircle />
          سوالات
        </Link>
        <Link
          className=" border flex items-center gap-3 justify-center w-9/12 md:w-52 py-3 rounded"
          to="fabrics"
        >
          <CgProfile />
          پروفایل
        </Link>
      </div>
    </div>
  )
}
