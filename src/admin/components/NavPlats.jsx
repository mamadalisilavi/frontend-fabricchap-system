import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"

export default function NavPlats({ title, back }) {
  return (
    <nav className="container mx-auto flex justify-center items-center bg-orange-600 ">
      <Link to={back} className="absolute left-4 md:left-20 lg:left-96">
        <IoIosArrowBack color="white" size={"24px"} />
      </Link>
      <div className="text-lg font-bold text-white text-center py-3">
        {title}
      </div>
    </nav>
  )
}
