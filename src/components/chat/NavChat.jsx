import { HiPhone } from "react-icons/hi"
import { HiMiniEllipsisVertical } from "react-icons/hi2"
import icon from "../../assets/images/logo-profile.png"
import { useState } from "react"

export default function NavChat() {
  const [show, setShow] = useState(false)
  function handleShowMenu() {
    return setShow(!show)
  }
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
        <a href="tel:+989162200380">
          <HiPhone
            color="white"
            size={"22px"}
            className="mx-2 focus:ring-green-300 focus:ring-4"
          />
        </a>
        <button onClick={handleShowMenu}>
          <HiMiniEllipsisVertical color="white" size={"24px"} />
        </button>
        {/* {show ? ( */}
        <div
          id="dropdownDots"
          className={
            (show ? " " : "hidden") +
            " bg-white absolute top-14 left-4 rounded p-2 text-stone-900"
          }
        >
          <ul class="py-4 px-2 text-base text-left flex flex-col  gap-3">
            <a href="https://eitaa.com/fabricchapadmin">ایتا</a>

            <a href="https://wa.me/+989162200380">واتساپ</a>

            <a href="https://t.me/fabricchapadmin">تلگرام</a>
          </ul>
        </div>
        {/* ) : null} */}
      </div>
    </nav>
  )
}
