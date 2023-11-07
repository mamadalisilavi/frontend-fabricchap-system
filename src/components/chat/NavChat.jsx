import { HiPhone } from "react-icons/hi";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import icon from "../../assets/images/logo-profile.jpg";

export default function NavChat() {
  return (
    <nav
      className="flex justify-between fixed w-full md:w-9/12 lg:w-1/2  mx-auto container top-0 bg-[#075e54]"
      dir="rtl"
    >
      <div className="m-2 flex items-center">
        <img className="rounded-full w-10" src={icon} alt="" />
        <div>
          <div className="font-bold text-white text-lg mx-3">فابریک چاپ</div>
          <div className="font-bold text-stone-100 text-xs mx-3">آنلاین</div>
        </div>
      </div>
      <div className="m-1 gap-2 flex items-center">
        <HiPhone
          color="white"
          size={"22px"}
          className="mx-2 focus:ring-green-300 focus:ring-4"
        />
        <HiMiniEllipsisVertical color="white" size={"24px"} />
      </div>
    </nav>
  );
}
