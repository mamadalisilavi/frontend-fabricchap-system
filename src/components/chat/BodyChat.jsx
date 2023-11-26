import { useState } from "react"
import api from "../../api"
import Cookies from "js-cookie"
import { useEffect } from "react"

export default function BodyChat() {
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
        console.log(e)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getFiles()
  }, [])
  return (
    <div id="body" className="bg-[#ece5dd] h-screen bg-chat overflow-auto">
      <div className="flex flex-col mt-[60px] mb-36" dir="rtl">
        {loading
          ? files.map((file) => {
              return (
                <div className="bg-stone-100 rounded-xl my-1 mx-10 p-3">
                  <div className="flex ">
                    <div className="flex flex-col">
                      <img
                        className=" w-[60px] "
                        src={
                          process.env.REACT_APP_API_STORAGE +
                          "resize/" +
                          file.file
                        }
                        alt=""
                        target="_blank"
                      />
                      <a
                        className="block text-sm text-blue-600"
                        href={
                          process.env.REACT_APP_API_STORAGE +
                          "resize/" +
                          file.file
                        }
                      >
                        مشاهده عکس
                      </a>
                    </div>
                    <div className="mx-3 my-2">
                      <div className="font-bold mb-3"> {file.file_name}</div>
                      <div className="flex">
                        <span className="">{file.size_x}</span>x
                        <span className="">{file.size_y}</span>
                        سانت
                      </div>
                      <b>تعداد:</b>
                      <span>{file.count}</span>
                    </div>
                  </div>
                </div>
              )
            })
          : "loading.."}
      </div>
    </div>
  )
}
