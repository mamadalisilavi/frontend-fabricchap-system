
import { useState } from "react"
import Cookies from "js-cookie"
import { useEffect } from "react"
import api from "../api"
import Loading from "../components/Loading"
import { Link } from "react-router-dom"

export default function ListChap() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  async function getFiles() {
    return await api
      .get("myfiles", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setFiles(e.data.files)
        setLoading(true)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getFiles()
  }, [])
  return (
    <div className="bg-gray-200 h-screen bg-chat overflow-auto">
      <div className="flex flex-col mt-[60px] mb-36 " dir="rtl">
        {loading ? (
          files.length === 0 ?
            <div className="flex flex-col text-base font-semibold justify-center items-center w-full h-screen">
            
              <div className="pb-4">  هیچ سفارشی وجود ندارد </div>
              <Link to={"/"} className="text-center bg-blue-600 px-3 py-2 flex gap-1 justify-center items-center mb-20 rounded-lg text-white ">ثبت سفارش جدید</Link>
            </div>
            :
            files.map((file) => {
              return (
                <div className="bg-white shadow-md rounded-md my-1 mx-4 p-2">
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <div className="flex flex-col items-cender justify-center">
                        <img
                          className=" w-[60px] h-[60px] object-cover rounded-md "
                          src={
                            process.env.REACT_APP_API_STORAGE +
                            "resize/" +
                            file.file
                          }
                        />
                      </div>
                      <div className="flex flex-col mr-4 ">
                        <div className="font-bold text-gray-700 mt-1 ">
                          {" "}
                          {file.file_name}
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-gray-500 font-bold">
                          <div className="">
                            <span className="">{file.size_x}</span>x
                            <span className="">{" "} {file.size_y}</span>
                          </div>
                          <span className="mr-4">{file.count}عدد</span>
                          <span className="mr-4">{file.fabric_plats.name}</span>
                          <a
                            className="mr-6 text-xs text-blue-600 underline"
                            href={process.env.REACT_APP_API_STORAGE + file.file}
                            target="_blank"
                          >
                            دانلود
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        {file.active === 0 ? (
                          <div className="bg-red-500 text-white px-3 py-1.5 mx-3 rounded text-xs">
                            درحال برسی
                          </div>
                        ) : file.status === 1 ? (
                          <div className="bg-orange-500 text-white px-3 py-1.5 mx-3 rounded text-xs">
                            مرحله اولیه چاپ
                          </div>
                        ) : file.status === 2 ? (
                          <div className="bg-yellow-500 text-white px-3 py-1.5 mx-3 rounded text-xs">
                            مرحله دومیه چاپ
                          </div>
                        ) : file.status === 3 ? (
                          <div className="bg-lime-600 text-white px-3 py-1.5 mx-3 rounded text-xs">
                            دوخت شده
                          </div>
                        ) : file.status === 4 ? (
                          <div className="bg-green-600 text-white px-3 py-1.5 mx-3 rounded text-xs">
                            ارسال شد
                          </div>
                        ) : (
                          <div className="bg-blue-500 text-white px-3 py-1.5 mx-3 rounded text-xs">
                            تایید شده
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
        ) : (
          <div className="flex justify-center items-center h-screen w-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  )
}
