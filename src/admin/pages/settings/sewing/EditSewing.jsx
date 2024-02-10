import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import NavSettings from "../../../components/NavSettings"
import api from "../../../../api"

export default function EditSewing() {
  const [data, setData] = useState({
    id: null,
    name: null,
    price: null,
    status: null,
    description: null,
  })
  const [loading, setLoading] = useState(false)
  const id = Boolean(window.localStorage.getItem("sewing_edit_id"))
    ? window.localStorage.getItem("sewing_edit_id")
    : window.location.replace("/admin/settings/sewings")
  async function handleSubmit(e) {
    e.preventDefault()
    return api
      .post(
        "sewing/update",
        {
          id: data.id,
          name: data.name,
          price: data.price,
          status: data.status,
          description: data.description,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        if (e.data.status) {
          window.location.replace("/admin/settings/sewings")
        }
      })
      .catch((e) => console.log(e))
  }
  async function getSewing() {
    return api
      .post(
        "sewing/edit",
        {
          id: id,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        setLoading(true)
        setData(e.data.sewing)
        console.log(e)
      })
      .catch((e) => console.log(e))
  }
  async function deleteSewing(e) {
    e.preventDefault()
    if (window.confirm("حذف این نوع دوخت؟")) {
      return api
        .post(
          "sewing/delete",
          {
            id: id,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
        )
        .then((e) => {
          window.localStorage.removeItem("sewing_edit_id")
          window.location.replace("/admin/settings/sewings")
        })
        .catch((e) => console.log(e))
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }
  useEffect(() => {
    getSewing()
    //eslint-disable-next-line
  }, [])
  if (loading) {
    return (
      <div className="container mx-auto md:w-2/3 lg:1/2 flex flex-col justify-center items-center">
        <NavSettings title={"ویرایش دوخت"} back={"/admin/settings/sewings"} />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full md:w-1/3 px-4 gap-4"
          dir="rtl"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              نوع دوخت
            </label>
            <input
              onChange={handleInputChange}
              value={data.name}
              type="text"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="نوع دوخت"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              قیمت
            </label>
            <input
              onChange={handleInputChange}
              value={data.price}
              type="number"
              id="price"
              name="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="قیمت "
              required
            />
          </div>
          <select
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            name="status"
            id="status"
          >
            <option value="0" selected={data.status === "0"}>
              انتخاب کنید
            </option>
            <option value="1" selected={data.status === 1}>
              قطعی
            </option>
            <option value="2" selected={data.status === 2}>
              دور تا دور
            </option>
            <option value="3" selected={data.status === 3}>
              یک طرفه
            </option>
            <option value="4" selected={data.status === 4}>
              غیر موجود
            </option>
          </select>
          <div>
            <div className="">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                شرح
              </label>
              <textarea
                onChange={handleInputChange}
                value={data.description}
                type="text"
                id="description"
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="شرح"
                required
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <button className="bg-blue-600 rounded w-full text-white py-3">
            ویرایش
          </button>
          <button
            onClick={deleteSewing}
            className="bg-red-600 rounded w-full text-white py-3 mt-4 block"
          >
            حذف
          </button>
          <div className="text-stone-500">
            <div>
              <div>حالت محاسبه قطعی یعنی بر اساس متراژ نیست </div>
              <div>
                حالت محاسبه دور تا دور یعنی مانند دور دوز از بالا و پایین و از
                چپ و راست پارچه محاسبه میشود{" "}
              </div>
              <div>
                {" "}
                حالت محاسبه یک طرفه یعنی فقط از طول پارچه و فقط از یک طرف مانند
                منگوله{" "}
              </div>
              <div>
                {" "}
                حالت ناموجود هنگامی انتخاب میشود که این نوع دوخت در حال حاظر
                موجود نمیباشد و در صفحه اصلی نشان داده نمیشود{" "}
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        لطفا صبر کنید...
      </div>
    )
  }
}
