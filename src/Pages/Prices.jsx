import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import api from "../api"
import MainPage from "./MainPage"
import Loading from "../components/Loading"

export default function Prices() {
  const [prices, setPrices] = useState()
  const [loading, setLoading] = useState(false)
  async function getPrices() {
    return api
      .get("fabrics", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setPrices(e.data.fabrics)
        setLoading(true)
      })
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    console.log(getPrices())
  }, [])

  const isCustomer = parseInt(Cookies.get("customer"))

  return (
    <div dir="rtl" className="">
      <div className="mt-20 overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
            <tr>
              <th scope="col" className="px-4 py-2">
                نام پارچه
              </th>
              <th scope="col" className="px-4 py-2">
                عرض(سانتیمتر)
              </th>
              {isCustomer === 1 ? (
                <th scope="col" className="px-4 py-2">
                  قیمت (تومان)
                </th>
              ) : null}
              {isCustomer === 0 ? (
                <th scope="col" className="px-4 py-2">
                  قیمت (تومان)
                </th>
              ) : null}

              <th scope="col" className="px-4 py-2">
                درصد تخفیف
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? prices.map((price) => {
                  return (
                    <tr className="odd:bg-white  even:bg-gray-50 ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {price.name}
                      </th>
                      <th scope="row" className="px-6 py-4 ">
                        {price.width}
                      </th>
                      {isCustomer === 1 ? (
                        <td className="px-4 py-2">
                          {price.price.toLocaleString("en-US")}
                        </td>
                      ) : null}
                      {isCustomer === 0 ? (
                        <td className="px-4 py-2">
                          {price.price_partner.toLocaleString("en-US")}
                        </td>
                      ) : null}
                      <td className="px-4 py-2 ">
                        {price.percent > 0 ? (
                          <div className="bg-yellow-500 text-white p-2 rounded-full w-max">
                            %{price.percent}
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  )
                })
              : 
              <div className="absolute top-96 right-1/2">

                  <Loading />
              </div>
              }
          </tbody>
        </table>
      </div>
    </div>
  )
}
