import moment from "jalali-moment"
import { Link } from "react-router-dom"
import NavAdmin from "../../components/NavAdmin"
import api from "../../../api"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
export default function Finance() {
  const [plats, setPlats] = useState()
  const [loading, setLoading] = useState(false)
  const [click, setClick] = useState(0)
  async function getPlats() {
    return await api
      .post("plats/UserPlats/",{date:"2024-06-03 13:57:48",number:"09025297933"}, {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        // setPlats(e.data.plats)
        // setLoading(true)
        console.log(e)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  async function ActivePlat(id) {
    return await api
      .post(
        "print/activePlat",
        { id },
        {
          headers: { Authorization: "Bearer " + Cookies.get("jht4") },
        }
      )
      .then((e) => {
        setClick(click + 1)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getPlats()
  }, [click])
  const [sumFabrics, setSumfabrics] = useState([])
  const [date, setDate] = useState()
  useEffect(() => {
    setDate(new Date())
  }, [])
  useEffect(() => {
    if (loading) {
      plats.map((e) =>
        setSumfabrics((prev) => [
          ...prev,
          { fabric: e.fabric_plats.name, count: e.size_y },
        ])
      )
    }

    // console.log(all)
  }, [date, loading])
  const groupAndSumFabricCounts = (fabricArray) => {
    return Object.values(
      fabricArray.reduce((acc, fabricObj) => {
        const fabricName = fabricObj.fabric
        const fabricCount = fabricObj.count

        if (!acc[fabricName]) {
          acc[fabricName] = { fabric: fabricName, count: 0 }
        }

        acc[fabricName].count += fabricCount

        return acc
      }, {})
    )
  }
  const resultArray = groupAndSumFabricCounts(sumFabrics)
  return (
    <div>
      <NavAdmin
        title={"امور مالی"}
        back={"/admin/dashboard"}
        color={"bg-green-600"}
      />
      <div
        dir="rtl"
        className="container mx-auto md:flex md:flex-col md:items-center md:justify-center "
      >
        {/* <div className="flex">
          <div className="flex">
            {resultArray.map((item, index) => (
              <div
                className="bg-blue-500 m-3 text-white rounded-lg p-4 text-center"
                key={index}
              >
                <div className="font-bold">{item.fabric}</div>
                <div className="">{parseInt(item.count) / 100}متر</div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 bg-white p-3 border">
          {loading
            ? plats.map((plat) => {
              return (
                <>
                  <div className="flex ">
                    <img
                      id="theImage"
                      loading="lazy"
                      width={"70px"}
                      height={"70px"}
                      className="p-1 rounded object-cover w-16 h-16"
                      src={
                        process.env.REACT_APP_API_STORAGE +
                        "resize/" +
                        plat.file
                      }
                      alt=""
                    />
                    {/* <a
                          href={process.env.REACT_APP_API_STORAGE + plat.file}
                          download={true}
                          className="hover:underline text-xs text-white bg-blue-500 rounded px-2 py-1"
                        >
                          دانلود
                        </a> */}
                    <div className="flex ">
                      <div className="mr-2 flex flex-col">
                        <div className="text-gray-800 font-bold mt-2  text-md flex justify-between"><div className="">{plat.file_name}</div>
                          <div> {moment(plat.created_at, "YYYY/MM/DD")
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                          </div>
                        </div>
                        <div className="flex gap-5 mt-2 text-gray-500">
                          <div className="">{plat.size_x}x{plat.size_y}</div>
                          <div className="">{plat.fabric_plats.name}</div>
                          <div className="">{plat.count}{" عدد"}</div>
                          <div className="">{plat.pieces}{" تیکه"}  </div>
                          <div className="">
                            {plat.backforth === 1 ? "پشت و رو" : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                      <div className="flex items-center mr-5 font-bold  ">40000</div>
                  </div>

                </>)
            })
            : "loading..."}
        </div>
      </div>
    </div>
  )
}
