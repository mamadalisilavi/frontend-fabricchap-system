import { useState } from "react"
import api from "../../api"
import Cookies from "js-cookie"
import { useEffect } from "react"

export default function BodyChat() {
  const [files, setFiles] = useState()
  const [loading, setLoading] = useState(false)
  async function getPlats() {
    return await api
      .get("plats", {
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
    getPlats()
  }, [])
  return (
    <div id="body" className="bg-[#ece5dd] h-screen bg-chat">
      tt
    </div>
  )
}
