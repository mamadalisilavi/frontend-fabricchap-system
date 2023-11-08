import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import api from "../../../../api";
export default function FileUpload() {
  const [checkedPieces, setCheckedPieces] = useState(false);
  const [file, setFile] = useState();
  const [data, setData] = useState({
    file_name: "",
    fabric: 0,
    pieces: 1,
    size_y: 0,
    size_x: 0,
    count: 0,
    backforth: 0,
    sewing: "",
    description: "",
  });
  const [click, setClick] = useState(false);
  const formData = new FormData();

  formData.append("file", file);
  formData.append("file_name", data.file_name);
  formData.append("size_x", data.size_x);
  formData.append("size_y", data.size_y);
  formData.append("fabric ", data.fabric);
  formData.append("count", data.count);
  formData.append("backforth", data.backforth);
  formData.append("pieces", data.pieces);
  formData.append("sewing", data.sewing);
  formData.append("description", data.description);

  formData.append("date", new Date().toLocaleDateString("fa-IR"));
  async function HandleSubmit(e) {
    e.preventDefault();
    if (click) {
      return await api
        .post("fileprint/store", formData, {
          headers: { Authorization: "Bearer " + Cookies.get("jht4") },
        })
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
        });
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
    console.log(data);
  }, [data]);
  return (
    <div className=" flex justify-center overflow-y-auto h-96  px-4">
      <div className="">
        <div>title</div>
        <div>
          <form
            onSubmit={HandleSubmit}
            action=""
            className="flex flex-col "
            dir="rtl"
          >
            <div className="flex items-center justify-center w-full" dir="rtl">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold">
                      برای آپلود عکس کلیک کنید.
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 ">
                    SVG, PNG, JPG or GIF (MAX. 250MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="file_name"
                className="block my-2 text-sm font-medium text-gray-900 "
              >
                نام فایل
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                name="file_name"
                id="file_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="نام فایل"
                required
              />
              <label
                htmlFor="fabric"
                className="block my-2 text-sm font-medium text-gray-900 "
              >
                نوع پارچه
              </label>
              <select
                onChange={handleInputChange}
                name="fabric"
                id="fabric"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="1">پورشه 140000تومان</option>
                <option value="">بدون استر 110000تومان</option>
                <option value="">هازان 180000تومان</option>
                <option value="">پورشه 140000تومان</option>
              </select>
              <div className="flex items-center gap-2 mt-4 mb-2">
                <input
                  className=" w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                  type="checkbox"
                  onChange={() => {
                    setCheckedPieces(!checkedPieces);
                  }}
                  name=""
                  id=""
                />
                چند تیکه
              </div>
              <label
                htmlFor="pieces"
                className="block text-sm font-medium text-gray-900 "
              >
                چند تیکه
              </label>
              <input
                onChange={handleInputChange}
                type="number"
                id="pieces"
                name="pieces"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-stone-300"
                placeholder="2"
                disabled={!checkedPieces}
              />
              <div className="flex">
                <div className="flex flex-col ">
                  <label
                    htmlFor="size_y"
                    className="block my-2 text-sm font-medium text-gray-900 "
                  >
                    طول
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    name="size_y"
                    id="size_y"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder=" طول به سانتی متر "
                    required
                  />
                </div>

                <div className="flex flex-col mx-1">
                  <label
                    htmlFor="size_x"
                    className="block my-2 text-sm font-medium text-gray-900 "
                  >
                    عرض
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    name="size_x"
                    id="size_x"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="عرض به سانتی متر"
                    required
                  />
                </div>
              </div>
              <label
                htmlFor="count"
                className="block my-2 text-sm font-medium text-gray-900 "
              >
                تعداد
              </label>
              <input
                onChange={handleInputChange}
                type="number"
                name="count"
                id="count"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="تعداد چاپ فایل "
                required
              />
            </div>
            <div className="flex items-center gap-2 mt-4 mb-2">
              <input
                className=" w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                onChange={handleInputChange}
                type="checkbox"
                name="backfroth"
                id="backfroth"
              />
              دو رو
            </div>
            <label
              htmlFor="sewing"
              className="block my-2 text-sm font-medium text-gray-900 "
            >
              توضیحات دوخت
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleInputChange}
              name="sewing"
              id="sewing"
              cols="30"
              rows="5"
              placeholder="توضیحات دوخت..،  سردوز،ریشه دوزی"
            ></textarea>
            <label
              htmlFor="description"
              className="block my-2 text-sm font-medium text-gray-900 "
            >
              توضیحات
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleInputChange}
              name="description"
              id="description"
              cols="30"
              rows="10"
            ></textarea>
            <button onClick={() => setClick(true)}>ارسال</button>
          </form>
          <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
}
