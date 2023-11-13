import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"

export default function NavAdmin({ title, back, color = "" }) {
  return (
    <nav
      className={`container mx-auto flex justify-center items-center ${color}`}
    >
      <Link to={back} className="absolute left-4 md:left-20 lg:left-96">
        <IoIosArrowBack color="white" size={"24px"} />
      </Link>
      <div className="text-lg font-bold text-white text-center py-3">
        {title}
      </div>
    </nav>
  )
}
