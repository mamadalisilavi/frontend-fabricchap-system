import React, { useEffect, useState } from "react"
import NavSettings from "../../../components/NavSettings"
import api from "../../../../api"
import Cookies from "js-cookie"

export default function AddSewing() {
  const [data, setData] = useState({
    name: null,
    price: null,
    status: null,
    description: null,
  })
  async function handleSubmit(e) {
    e.preventDefault()
    return api
      .post(
        "sewing/store",
        {
          name: data.name,
          price: data.price,
          status: data.status,
          description: data.description,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => window.location.replace("/admin/settings/sewings"))
      .catch((e) => console.log(e))
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className="container mx-auto md:w-2/3 lg:1/2 flex flex-col justify-center items-center">
      <NavSettings title={"افزودن دوخت"} back={"/admin/settings/sewings"} />
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
            type="number"
            id="price"
            name="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="قیمت "
            required
          />
        </div>
        <div>
          <div className="">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              حالت محاسبه دوخت
            </label>
            <select
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="status"
              id="status"
            >
              <option value="0">انتخاب کنید</option>
              <option value="1">قطعی</option>
              <option value="2">دور تا دور</option>
              <option value="3">یک طرفه</option>
              <option value="4">غیر موجود</option>
            </select>
          </div>
          <div className="">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              شرح
            </label>
            <textarea
              onChange={handleInputChange}
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
          افزودن
        </button>
        <div className="text-stone-500">
          <div>
            <div>حالت محاسبه قطعی یعنی بر اساس متراژ نیست </div>
            <div>
              حالت محاسبه دور تا دور یعنی مانند دور دوز از بالا و پایین و از چپ
              و راست پارچه محاسبه میشود{" "}
            </div>
            <div>
              {" "}
              حالت محاسبه یک طرفه یعنی فقط از طول پارچه و فقط از یک طرف مانند
              منگوله{" "}
            </div>
            <div>
              {" "}
              حالت ناموجود هنگامی انتخاب میشود که این نوع دوخت در حال حاظر موجود
              نمیباشد و در صفحه اصلی نشان داده نمیشود{" "}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
