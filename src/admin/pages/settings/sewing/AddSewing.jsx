import React, { useState } from "react"
import NavSettings from "../../../components/NavSettings"
import api from "../../../../api"
import Cookies from "js-cookie"

export default function AddSewing() {
  const [data, setData] = useState({
    name: null,
    price: null,
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
            class="block mb-2 text-sm font-medium text-gray-900"
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
      </form>
    </div>
  )
}
