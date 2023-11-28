import React, { useState } from "react"
import NavSettings from "../components/NavSettings"
import api from "../../api"
import Cookies from "js-cookie"

export default function AddFabric() {
  const [data, setData] = useState({
    name: null,
    width: null,
    price: null,
    price_partner: null,
    percent: null,
    description: null,
  })
  async function handleSubmit(e) {
    e.preventDefault()
    return api
      .post(
        "fabric/store",
        {
          name: data.name,
          width: data.width,
          price: data.price,
          price_partner: data.price_partner,
          percent: data.percent,
          description: data.description,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => window.location.replace("/admin/settings/fabrics"))
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
      <NavSettings title={"افزودن پارچه"} back={"/admin/settings/fabrics"} />
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
            نام پارچه
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="نام پارچه"
            required
          />
        </div>
        <div>
          <label
            htmlFor="width"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            عرض پارچه
          </label>
          <input
            onChange={handleInputChange}
            type="number"
            id="width"
            name="width"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="عرض پارچه"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            قیمت مشتری
          </label>
          <input
            onChange={handleInputChange}
            type="number"
            id="price"
            name="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="قیمت مشتری"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            قیمت همکار
          </label>
          <input
            onChange={handleInputChange}
            type="number"
            id="price_partner"
            name="price_partner"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="قیمت همکار"
            required
          />
        </div>
        <div>
          <label
            htmlFor="percent"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            درصد تخفیف
          </label>
          <input
            onChange={handleInputChange}
            type="number"
            id="percent"
            name="percent"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="درصد تخفیف"
            required
          />
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
