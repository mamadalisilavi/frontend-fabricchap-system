import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import api from "../../../../api"
import Loading from "../../../Loading"

export default function ConfirmPage({ data, confirm, click }) {
  const sewingPrices = (id, x, y, price, count) => {
    switch (id) {
      case "1":
        return price * count
      case "2":
        return ((x + y) * 2 * price * count).toFixed()
      case "3":
        return price * y * count
      default:
        return ""
    }
  }
  const [customer, setCustomer] = useState()
  const [loading, setLoading] = useState(false)
  async function getUser() {
    return await api
      .get("isCustomer", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setCustomer(e.data.customer)
        setLoading(true)
        // console.log(e)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className={confirm ? (click ? "hidden" : "") : "hidden"}>
      {loading ? (
        customer === 1 ? (
          <div className="">
            <div className="flex justify-center mt-6 w-80 ">
              <div className="text-2xl font-bold">
                {Number(
                  Number(
                    parseInt(data.fabric_price) *
                      (parseInt(data.size_y) / 100) *
                      parseInt(data.count)
                  ) +
                    Number(
                      sewingPrices(
                        data.sewing_status,
                        parseInt(data.size_x) / 100,
                        parseInt(data.size_y) / 100,
                        parseInt(data.sewing_price),
                        parseInt(data.count)
                      )
                    )
                ).toLocaleString("en-US")}
                تومان
              </div>
            </div>
            <div className="text-red-600 text-sm text-center my-3">
              توجه : ممکن است در قیمت نهایی کم و زیادی داشته باشد.
            </div>

            <div className="px-6 py-3 gap-4 text-sm  text-gray-900 bg-white flex">
              <div> {data.file_name}</div>
              <div>{data.fabric_name}</div>
              <div>
                {data.size_x}x{data.size_y}سانتیمتر
              </div>
              <div>{data.sewing_name}</div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-x-auto  pb-3" dir="rtl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg"></th>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    واحد
                  </th>
                  <th scope="col" className="px-6 py-3">
                    تومان
                  </th>
                  <th scope="col" className="px-6 py-3">
                    تومان
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    <div className="block"> پارچه {data.fabric_name}</div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  >
                    متر
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-900 bg-stone-50"
                  >
                    <div className=" ">
                      {Number(data.fabric_price).toLocaleString("en-US")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    طول
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  >
                    متر
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50 flex"
                  >
                    <div className=""> {data.size_y / 100} </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    تعداد
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  >
                    عدد
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50 flex"
                  >
                    <div className=""> {data.count} </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    دو رو
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  >
                    {data.backforth === 1 ? "دو رو" : "تک رو"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    جمع
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-900 bg-stone-50 flex"
                  >
                    <div className=" border-b border-stone-800">
                      {" "}
                      {data.backforth === 1
                        ? parseInt(data.pieces) > 1
                          ? Number(
                              data.fabric_price *
                                (data.size_y / 100) *
                                data.count *
                                2 *
                                parseInt(data.pieces)
                            ).toLocaleString("en-US")
                          : Number(
                              data.fabric_price *
                                (data.size_y / 100) *
                                data.count *
                                2
                            ).toLocaleString("en-US")
                        : Number(
                            data.fabric_price *
                              (data.size_y / 100) *
                              parseInt(data.pieces) *
                              data.count
                          ).toLocaleString("en-US")}
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    <div className=""> {data.sewing_name} </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50 flex"
                  >
                    <div className=""> متر </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  >
                    {" "}
                    {Number(data.sewing_price).toLocaleString("en-US")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    <div className="">طول و عرض </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50 flex"
                  >
                    <div className=""> متر </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  >
                    {data.size_y}*{data.size_x}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    تعداد
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  >
                    عدد
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50 flex"
                  >
                    <div className=""> {data.count} </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                    جمع
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-stone-50"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-900 bg-stone-50 flex"
                  >
                    <div className=" border-b border-stone-800">
                      {Number(
                        sewingPrices(
                          data.sewing_status,
                          data.size_x / 100,
                          data.size_y / 100,
                          data.sewing_price,
                          data.count
                        )
                      ).toLocaleString("en-US")}
                      {/* {data.sewing_status === "1"
                    ? data.fabric_price * data.count
                    : data.sewing_status === "2"
                    ? data.fabric_price *
                      (data.size_x + data.size_y * 2) *
                      data.count
                    : data.sewing_status === "3"
                    ? data.fabric_price * data.size_y * data.count
                    : null} */}
                    </div>
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3  text-gray-900 bg-green-300"
                  >
                    جمع کل
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg text-gray-700 bg-green-200"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-700 bg-green-200"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-gray-900 bg-green-200 flex"
                  >
                    <div className="border-double border-b-4 border-stone-800 h-[40px] flex flex-col items-center justify-center">
                      {data.backforth === 0
                        ? Number(
                            Number(
                              parseInt(data.fabric_price) *
                                (parseInt(data.size_y) / 100) *
                                parseInt(data.count) *
                                parseInt(data.pieces)
                            ) +
                              Number(
                                sewingPrices(
                                  data.sewing_status,
                                  parseInt(data.size_x) / 100,
                                  parseInt(data.size_y) / 100,
                                  parseInt(data.sewing_price),
                                  parseInt(data.count)
                                )
                              )
                          ).toLocaleString("en-US")
                        : Number(
                            Number(
                              parseInt(data.fabric_price) *
                                (parseInt(data.size_y) / 100) *
                                parseInt(data.count) *
                                2 *
                                parseInt(data.pieces)
                            ) +
                              Number(
                                sewingPrices(
                                  data.sewing_status,
                                  parseInt(data.size_x) / 100,
                                  parseInt(data.size_y) / 100,
                                  parseInt(data.sewing_price),
                                  parseInt(data.count) * 2
                                )
                              )
                          ).toLocaleString("en-US")}
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
            <div className="text-red-600 text-sm text-center my-3">
              توجه : ممکن است در قیمت نهایی کم و زیاد داشته باشد.
            </div>

            <div className="px-6 py-3 gap-4 text-sm flex flex-col text-gray-900 bg-white ">
              <div> {data.file_name}</div>
              <div>{data.fabric_name}</div>
              <div>
                {data.size_x}x{data.size_y}سانتیمتر
              </div>
              <div>{data.sewing_name}</div>
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}
