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
    <div>
      <ul>
        <li>نام پارچه - قیمت مشتری - قیمت همکار</li>
        {loading
          ? prices.map((price) => {
              return (
                <li>
                  {price.name} - {price.price} - {price.price_partner}
                </li>
              );
            })
          : "لطفا صبر کنید..."}
      </ul>
    </div>
  );
}
