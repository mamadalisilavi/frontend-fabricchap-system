import Cookies from "js-cookie";
import api from "../../api";
import { useEffect, useState } from "react";
import NavSettings from "../components/NavSettings";
import { AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function FabricsSettings() {
  const [fabrics, setFabrics] = useState();
  const [loading, setLoading] = useState(false);
  async function getFabrics() {
    return await api
      .get("fabrics", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setFabrics(e.data.fabrics);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function handleEdit(id) {
    return window.localStorage.setItem("fabric_edit_id", id);
  }
  useEffect(() => {
    getFabrics();
  }, []);
  return (
    <div
      dir="rtl"
      className="container mx-auto md:flex md:flex-col md:items-center md:justify-center"
    >
      <NavSettings title={"پارچه ها"} />
      <div className=" bg-blue-500 text-stone-100 p-2 flex justify-between w-full md:w-1/2 md:text-base  text-sm">
        <div className="mx-3">نام پارچه</div>
        <div className="mx-3">عرض</div>
        <div className="mx-3">قیمت(تومان)</div>
        <div className="mx-3">درصد تخفیف</div>
        <div className="mx-3">ویرایش</div>
      </div>
      {loading
        ? fabrics.map((fabric) => {
            return (
              <div className="w-full md:w-1/2">
                <div className="border p-2  flex justify-between  ">
                  <div className="">{fabric.name}</div>
                  <div className="">{fabric.width}</div>
                  <div className="">{fabric.price}</div>
                  <div className="">{fabric.percent}</div>
                  <button
                    onClick={() => handleEdit(fabric.id)}
                    className="flex gap-3"
                  >
                    <Link
                      to={"edit"}
                      className="bg-blue-700 flex gap-1 px-1 text-sm text-white p-1 rounded"
                    >
                      <AiFillEdit size={"18"} />
                      <div className="hidden md:block">ویرایش</div>
                    </Link>
                  </button>
                </div>
              </div>
            );
          })
        : "loading..."}

      <Link
        className="bg-blue-500 text-white w-9/12 md:w-1/3 rounded py-2 text-center mx-auto mt-4 flex gap-3 justify-center items-center"
        to="add"
      >
        افزودن پارچه
        <FaPlus />
      </Link>
    </div>
  );
}
