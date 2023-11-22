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

  return (
    <div className={confirm ? (click ? "hidden" : "") : "hidden"}>
      <div class="relative overflow-x-auto  pb-3" dir="rtl">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3 rounded-s-lg"></th>
              <th scope="col" class="px-6 py-3 rounded-s-lg">
                واحد
              </th>
              <th scope="col" class="px-6 py-3">
                تومان
              </th>
              <th scope="col" class="px-6 py-3">
                تومان
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col" className="px-6 py-3  text-gray-900 bg-white">
                <div className="block"> پارچه {data.fabric_name}</div>
              </th>
              <th scope="col" className="px-6 py-3 text-gray-700 bg-stone-50">
                متر
              </th>
              <th scope="col" className="px-6 py-3 text-gray-900 bg-stone-50">
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
              <th scope="col" className="px-6 py-3 text-gray-700 bg-stone-50">
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
              <th scope="col" className="px-6 py-3 text-gray-700 bg-stone-50">
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
                  {" "}
                  {Number(
                    data.fabric_price * (data.size_y / 100) * data.count
                  ).toLocaleString("en-US")}{" "}
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
              <th scope="col" className="px-6 py-3 text-gray-700 bg-stone-50">
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
              <th scope="col" className="px-6 py-3 text-gray-700 bg-stone-50">
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
              <th scope="col" className="px-6 py-3 text-gray-700 bg-stone-50">
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
              <th scope="col" className="px-6 py-3  text-gray-900 bg-green-300">
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
                <div className="border-double border-b-4 border-stone-800 ">
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
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}