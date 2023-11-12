import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import api from "../../../../api";

export default function Prices() {
  const [prices, setPrices] = useState();
  const [loading, setLoading] = useState(false);
  async function getPrices() {
    return api
      .get("fabrics", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setPrices(e.data.fabrics);
        setLoading(true);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    console.log(getPrices());
  }, []);
  return (
    <div dir="rtl" className="">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-9/12 md:w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-4 py-2">
                نام پارچه
              </th>
              <th scope="col" class="px-4 py-2">
                قیمت مشتری(تومان)
              </th>
              <th scope="col" class="px-4 py-2">
                قیمت همکار(تومان)
              </th>
              <th scope="col" class="px-4 py-2">
                درصد تخفیف
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? prices.map((price) => {
                  return (
                    <tr class="odd:bg-white  even:bg-gray-50 ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {price.name}
                      </th>
                      <td class="px-4 py-2">
                        {price.price.toLocaleString("en-US")}
                      </td>
                      <td class="px-4 py-2">
                        {price.price_partner.toLocaleString("en-US")}
                      </td>
                      <td class="px-4 py-2">%{price.percent}</td>
                    </tr>
                  );
                })
              : "لطفا صبر کنید..."}
          </tbody>
        </table>
      </div>
    </div>
  );
}
