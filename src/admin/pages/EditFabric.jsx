import { useState, useEffect } from "react";
import NavSettings from "../components/NavSettings";
import api from "../../api";
import Cookies from "js-cookie";

export default function EditFabric() {
  const [data, setData] = useState({
    id: null,
    name: null,
    width: null,
    price: null,
    price_partner: null,
    percent: null,
    description: null,
  });
  const [loading, setLoading] = useState(false);
  const id = Boolean(window.localStorage.getItem("fabric_edit_id"))
    ? window.localStorage.getItem("fabric_edit_id")
    : window.location.replace("/admin/settings/fabrics");
  async function handleSubmit(e) {
    e.preventDefault();
    return api
      .post(
        "fabric/update",
        {
          id: data.id,
          name: data.name,
          width: data.width,
          price: data.price,
          price_partner: data.price_partner,
          percent: data.percent,
          description: data.description,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        if (e.data.status) {
          window.location.replace("/admin/settings/fabrics");
        }
      })
      .catch((e) => console.log(e));
  }
  async function getFabric() {
    return api
      .post(
        "fabric/edit",
        {
          id: id,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
      )
      .then((e) => {
        setLoading(true);
        setData(e.data.fabric);
      })
      .catch((e) => console.log(e));
  }
  async function deleteFabric(e) {
    e.preventDefault();
    if (window.confirm("حذف این پارچه؟")) {
      return api
        .post(
          "fabric/delete",
          {
            id: id,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("jht4") } }
        )
        .then((e) => {
          window.location.replace("/admin/settings/fabrics");
        })
        .catch((e) => console.log(e));
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  useEffect(() => {
    getFabric();
  }, []);
  if (loading) {
    return (
      <div className="container mx-auto md:w-2/3 lg:1/2 flex flex-col justify-center items-center">
        <NavSettings title={"ویرایش پارچه"} />
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
              نام پارچه
            </label>
            <input
              onChange={handleInputChange}
              value={data.name}
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
              value={data.width}
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
              value={data.price}
              type="number"
              id="price"
              name="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="قیمت پارچه"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price_partner"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              قیمت همکار
            </label>
            <input
              onChange={handleInputChange}
              value={data.price_partner}
              type="number"
              id="price_partner"
              name="price_partner"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="قیمت پارچه"
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
              value={data.percent}
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
            onClick={deleteFabric}
            className="bg-red-600 rounded w-full text-white py-3 mt-4 block"
          >
            حذف
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        لطفا صبر کنید...
      </div>
    );
  }
}
