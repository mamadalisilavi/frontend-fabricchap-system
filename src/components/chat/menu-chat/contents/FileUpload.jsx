import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import api from "../../../../api"
import axios from "axios"
import validator from "validator"
import ConfirmPage from "./ConfirmPage"
import Loading from "../../../Loading"
export default function FileUpload() {
  const [checkedPieces, setCheckedPieces] = useState(false)
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState("لطفا فایل را انتخاب کنید")
  const [file_file, setFileFile] = useState("")

  const [data, setData] = useState({
    file_name: "",
    fabric: "0",
    pieces: 1,
    size_y: 0,
    size_x: 0,
    count: 0,
    backforth: 0,
    sewing: "0",
    description: "",
    fabric_price: 0,
    fabric_name: "",
    sewing_name: "",
    sewing_price: "",
    sewing_status: 0,
    errors: {
      file_name: "لطفا اسم فایل را پر کنید",
      pieces: "",
      size_y: "لطفا طول طرح را پر کنید",
      size_x: "لطفا عرض طرح را پر کنید",
      count: "لطفا تعداد را انتخاب کنید",
      backforth: "",
      description: "لطفا توضیحات را بنویسید",
    },
  })
  const [sewingError, setSewingError] = useState("لطفا نوع دوخت را انتخاب کنید")
  const [fabricError, setFabricError] = useState(
    "لطفا نوع پارچه را انتخاب کنید"
  )
  const [customer, setCustomer] = useState(false)
  const [persentUpload, setPercentUpload] = useState(0)
  const [click, setClick] = useState(false)
  const [fabrics, setFabrics] = useState([])
  const [sewings, setSewings] = useState([])
  const [loadingFabrics, setLoadingFabrics] = useState(false)
  const [loadingSewings, setLoadingSewings] = useState(false)
  const [errorBackend, setErrorBackend] = useState()
  const [success, setSuccess] = useState(false)
  const [loaded, setLoaded] = useState()
  const [max, setMax] = useState(0)
  const [max2, setMax2] = useState(0)

  //new form data
  const formData = new FormData()

  formData.append("file", file)
  formData.append("file_name", data.file_name)
  formData.append("size_x", data.size_x)
  formData.append("size_y", data.size_y)
  formData.append("fabric", data.fabric)
  formData.append("count", data.count)
  formData.append("backforth", data.backforth)
  formData.append("pieces", data.pieces)
  formData.append("sewing", data.sewing)
  formData.append("description", data.description)
  formData.append(
    "date",
    new Date().toLocaleDateString("fa-IR", { numberingSystem: "latn" })
  )
  async function HandleSubmit(e) {
    e.preventDefault()
    if (click) {
      return await axios({
        method: "POST",
        url: process.env.REACT_APP_API_BASE_URL + "fileprint/store",
        headers: {
          Authorization: "Bearer " + Cookies.get("jht4"),
        },
        data: formData,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          setPercentUpload(Math.floor((loaded * 100) / total))
        },
      })
        .then((e) => {
          setLoadIsFull(false)
          if (e.data.status) {
            setSuccess(true)
          }
        })
        .catch((e) => {
          console.log(e)
          setErrorBackend(e.response.data.message)
        })
    }
  }

  //when input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      errors: {
        ...prevData.errors,
        [name]: validateInput(name, value),
      },
    }))
  }
  const handleInputChecked = (e) => {
    const { checked } = e.target
    setData({
      ...data,
      backforth: checked ? 1 : 0,
    })
  }
  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "file_name":
        if (validator.isEmpty(value)) {
          return "لطفا اسم فایل را پر کنید"
        } else if (!validator.isLength(value, { min: 1, max: 30 })) {
          return "لطفا نام فایل بین 1 تا 30 کاراکتر باشد."
        } else {
          return ""
        }
      case "fabric":
        if (parseInt(value) === 0) {
          return ""
        } else {
          return "لطفا نوع پارچه را انتخاب کنید."
        }
      case "pieces":
        if (validator.isEmpty(value)) {
          return "لطفا تعداد تیکه طرح را وارد کنید"
        } else if (parseInt(value) === 1) {
          return "لطفا تعداد تیکه طرح را بیشتر از 1 وارد کنید"
        } else {
          return ""
        }
      case "size_x":
        if (checkedPieces) {
          if (validator.isEmpty(value)) {
            return "لطفا عرض طرح را وارد کنید"
          } else if (!validator.isFloat(value) || !validator.isNumeric(value)) {
            return "لطفا عدد وارد کنید."
          } else if (max2 === 0) {
            return `لطفا نوع پارچه را انتخاب کنید.`
          } else if (parseFloat(value) <= 0) {
            return "لطفا عدد صحیح وارد کنید"
          } else if (parseFloat(value) < 1) {
            return `عرض پارچه انتخاب شده ${max2} سانت است.`
          } else if (parseFloat(value) > max2) {
            return `عرض پارچه انتخاب شده ${max2} سانت است.`
          } else if (value.includes(".") && value.split(".")[1].length > 3) {
            return `عرض پارچه انتخاب شده ${max2} سانت است.`
          }
        } else {
          if (validator.isEmpty(value)) {
            return "لطفا عرض طرح را وارد کنید"
          } else if (!validator.isFloat(value) || !validator.isNumeric(value)) {
            return "لطفا عدد وارد کنید."
          } else if (max === 0) {
            return `لطفا نوع پارچه را انتخاب کنید.`
          } else if (parseFloat(value) <= 0) {
            return "لطفا عدد صحیح وارد کنید"
          } else if (parseFloat(value) < 1) {
            return `عرض پارچه انتخاب شده ${max} سانت است.`
          } else if (parseFloat(value) > max) {
            return `عرض پارچه انتخاب شده ${max} سانت است.`
          } else if (value.includes(".") && value.split(".")[1].length > 3) {
            return `عرض پارچه انتخاب شده ${max} سانت است.`
          }
        }
        return ""
      case "size_y":
        if (validator.isEmpty(value)) {
          return "لطفا طول طرح را وارد کنید"
        }
        if (!validator.isFloat(value) || !validator.isNumeric(value)) {
          return "لطفا عدد وارد کنید."
        }
        if (value <= 0) {
          return "لطفا عدد صحیح وارد کنید"
        }
        return ""
      case "pieces":
        if (!validator.isNumeric(value)) {
          return "لطفا عدد وارد کنید."
        } else if (value <= 0) {
          return "لطفا عدد صحیح وارد کنید"
        } else {
          return ""
        }
      case "count":
        if (validator.isEmpty(value)) {
          return "لطفا تعداد را وارد کنید."
        } else if (!validator.isNumeric(value)) {
          return "لطفا عدد وارد کنید."
        } else if (value <= 0) {
          return "لطفا عدد صحیح وارد کنید"
        } else {
          return ""
        }
      // case "sewing":
      //   if (parseInt(value) === 0) {
      //     return "لطفا نوع دوخت را انتخاب کنید."
      //   } else if (parseInt(value) > 0) {
      //     return ""
      //   }
      case "description":
        if (validator.isEmpty(value)) {
          return "لطفا توضیحات را بنویسید."
        } else if (!validator.isLength(value, { max: 500 })) {
          return "حد اکثر توضیحات 500 حرف است."
        } else {
          return ""
        }
      default:
        return ""
    }
  }
  //get fabrics
  async function getFabrics() {
    return await api
      .get("fabrics", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setLoadingFabrics(true)
        setFabrics(e.data.fabrics)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const [validForm, setValidForm] = useState(false)
  const handleConfirm = (e) => {
    e.preventDefault()
    setConfirm(true)
  }

  //getSewings
  async function getSewings() {
    return await api
      .get("sewings", {
        headers: { Authorization: "Bearer " + Cookies.get("jht4") },
      })
      .then((e) => {
        setLoadingSewings(true)
        setSewings(e.data.sewings)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getFabrics()
    getSewings()
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (
      Object.values(data.errors).every((error) => error === "") &&
      fileError === "" &&
      fabricError === "" &&
      sewingError === ""
    ) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
    window.localStorage.setItem("formData", JSON.stringify(data))
    // console.log(parseInt(data.sewing))
    if (parseInt(data.sewing) === 0) {
      setSewingError("لطفا نوع دوخت را انتخاب کنید")
    } else if (parseInt(data.sewing) > 0) {
      setSewingError("")
    }
    if (parseInt(data.fabric) === 0) {
      setFabricError("لطفا نوع پارچه را انتخاب کنید")
    } else if (parseInt(data.fabric) > 0) {
      setFabricError("")
    }
  }, [data])
  useEffect(() => {
    setLoaded(new Date())

    if (loaded !== null) {
      // if (Boolean(window.localStorage.getItem("formData"))) {
      //   setData(JSON.parse(window.localStorage.getItem("formData")))
      // }

      if (data.file_name === "") {
        setValidForm(false)
      }
      if (parseInt(data.sewing) === 0) {
        setSewingError("لطفا نوع دوخت را انتخاب کنید")
      }
      if (parseInt(data.fabric) === 0) {
        setFabricError("لطفا نوع پارچه را انتخاب کنید")
      }
    }
  }, [])

  useEffect(() => {
    if (file === null) {
      setValidForm(false)
    } else {
      if (data.file_name === "") {
        setValidForm(false)
      }
    }
    if (file_file === "") {
      setFileError("لطفا فایل را انتخاب کنید")
    } else {
      setFileError("")
    }
  }, [file])
  useEffect(() => {
    if (checkedPieces) {
      setMax2(max * data.pieces)
    }
  }, [checkedPieces, data.size_x])
  const [loadIsFull, setLoadIsFull] = useState(false)
  useEffect(() => {
    if (persentUpload === 100) {
      setLoadIsFull(true)
    }
  }, [persentUpload])
  const [confirm, setConfirm] = useState(false)

  const handleSewingChinge = (e) => {
    setData((prev) => ({
      ...prev,
      sewing: e.target.value,
    }))
    var index = e.target.selectedIndex
    var optionElement = e.target.childNodes[index]
    var sewingName = optionElement.getAttribute("name")
    var sewingPrice = optionElement.getAttribute("price")
    var sewingStatus = optionElement.getAttribute("status")
    setData((prev) => ({
      ...prev,
      sewing_name: sewingName,
    }))
    setData((prev) => ({
      ...prev,
      sewing_price: sewingPrice,
    }))
    setData((prev) => ({
      ...prev,
      sewing_status: sewingStatus,
    }))
  }
  return (
    <div className=" flex justify-center overflow-y-auto h-96  px-4">
      <div className="">
        {/* <div className={confirm ? "hidden" : ""}> */}
        {/* <div className="text-red-500 text-sm my-1">{data.errors.count}</div> */}
        <form
          onSubmit={HandleSubmit}
          action=""
          className="flex flex-col "
          dir="rtl"
        >
          <div className={confirm ? "hidden" : ""}>
            <div className="flex items-center justify-center w-full" dir="rtl">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
              >
                {file === null ? (
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
                      SVG, PNG, JPG or GIF (MAX. 60MB)
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-end flex-wrap">
                    <div className="flex " dir="ltr">
                      name:
                      <div className="text-stone-700  ml-2"> {file.name}</div>
                    </div>
                    <div className="flex " dir="ltr">
                      size:
                      <div className="text-stone-700 ml-5">
                        {(file.size / (1024 * 1024)).toFixed(3) + "MB"}
                      </div>
                    </div>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  name="file"
                  type="file"
                  accept="image/png, image/gif, image/jpeg, image/jpg,  image/svg"
                  className="hidden"
                  onChange={(e) => {
                    setFileFile(e.target.value)
                    setFile(e.target.files[0])
                  }}
                />
              </label>
            </div>
            <div className="text-red-500 text-sm my-1">{fileError}</div>
            <div>
              <label
                htmlFor="file_name"
                className="block my-2 text-sm font-medium text-gray-900 "
              >
                نام یا کد فایل
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                name="file_name"
                id="file_name"
                value={data.file_name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="نام فایل"
                required
              />
              <div className="text-red-500 text-sm my-1">
                {data.errors.file_name}
              </div>
              <label
                htmlFor="fabric"
                className="block my-2 text-sm font-medium text-gray-900 "
              >
                نوع پارچه
              </label>
              <select
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    fabric: e.target.value,
                  }))
                  var index = e.target.selectedIndex
                  var optionElement = e.target.childNodes[index]
                  var option = optionElement.getAttribute("width")
                  var fabricPrice = optionElement.getAttribute("price")
                  var fabricName = optionElement.getAttribute("name")
                  setMax(option)
                  setData((prev) => ({
                    ...prev,
                    fabric_price: fabricPrice,
                  }))
                  setData((prev) => ({
                    ...prev,
                    fabric_name: fabricName,
                  }))
                }}
                name="fabric"
                id="fabric"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value={"0"} width={"0"} price={"0"}>
                  نوع پارچه - قیمت مشتری - قیمت همکار
                </option>
                {loadingFabrics ? (
                  fabrics.map((fabric) => {
                    // setMax(fabric.width)
                    return (
                      <option
                        price={
                          Cookies.get("customer") === 1
                            ? fabric.price
                            : fabric.price_partner
                        }
                        name={fabric.name}
                        width={fabric.width}
                        key={fabric.id}
                        value={fabric.id}
                      >
                        {fabric.name} - {fabric.price.toLocaleString("en-US")}ت
                        - {fabric.price_partner.toLocaleString("en-US")}ت
                      </option>
                    )
                  })
                ) : (
                  <option value="">لطفا منتظر بمانید</option>
                )}
              </select>
              <div className="text-red-500 text-sm my-1">{fabricError}</div>
              <div className="flex items-center gap-2 mt-4 mb-2">
                <input
                  className=" w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                  type="checkbox"
                  onChange={() => {
                    setCheckedPieces(!checkedPieces)
                  }}
                  name=""
                  id=""
                />
                <div className="text-sm">چند تیکه</div>
                <div className="text-xs text-stone-500 w-72">
                  {max === 0
                    ? null
                    : ` در صورت نیاز طرح با عرض بیشتر از ${max} سانت این تیک را فعال کنید`}
                </div>
              </div>
              <label
                htmlFor="pieces"
                className="block text-sm font-medium text-gray-900 "
              >
                چند تیکه
                <div className="text-xs text-stone-500 w-96 py-1 font-normal">
                  {checkedPieces
                    ? ` تعداد تیکه بر اساس عرض طرح، برای مثال طرح با عرض 280 سانت و طول بیشتر از 140 سانت باید 2 تیکه بشود.`
                    : null}
                </div>
              </label>
              <input
                onChange={handleInputChange}
                type="number"
                min={"1"}
                id="pieces"
                name="pieces"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-stone-200"
                placeholder={``}
                disabled={!checkedPieces}
              />
              <div className="text-red-500 text-sm my-1">
                {data.errors.pieces}
              </div>
              <div className="flex">
                <div className="flex flex-col ">
                  <label
                    htmlFor="size_y"
                    className="block my-2 text-sm font-medium text-gray-900 "
                  >
                    طول (سانتیمتر)
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    name="size_y"
                    id="size_y"
                    step="0.1"
                    min={"0"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder=" طول به سانتی متر "
                    required
                  />
                  <div className="text-red-500 text-sm my-1">
                    {data.errors.size_y}
                  </div>
                </div>

                <div className="flex flex-col mx-1">
                  <label
                    htmlFor="size_x"
                    className="block my-2 text-sm font-medium text-gray-900 "
                  >
                    عرض (سانتیمتر)
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    name="size_x"
                    id="size_x"
                    step="0.1"
                    min={0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="عرض به سانتی متر"
                    required
                  />
                  <div className="text-red-500 text-sm my-1">
                    {data.errors.size_x}
                  </div>
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
                min={"1"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="تعداد چاپ فایل "
                required
              />
              <div className="text-red-500 text-sm my-1">
                {data.errors.count}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 mb-2">
              <input
                className=" w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                onChange={handleInputChecked}
                type="checkbox"
                name="backfroth"
                id="backfroth"
              />
              دو رو
              <div className="text-xs text-stone-500 w-72">
                اگر به دورو شدن طرح نیاز دارید، این تیک را فعال کنید
              </div>
            </div>
            <label
              htmlFor="sewing"
              className="block my-2 text-sm font-medium text-gray-900 "
            >
              نوع دوخت
            </label>
            <select
              onChange={handleSewingChinge}
              name="sewing"
              id="sewing"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">انتخاب کنید</option>
              {loadingSewings ? (
                sewings.map((sewing) => {
                  return (
                    <option
                      key={sewing.id}
                      price={sewing.price}
                      name={sewing.name}
                      value={sewing.id}
                      status={sewing.status}
                    >
                      {sewing.name} - {sewing.price.toLocaleString("en-US")}
                      تومان
                    </option>
                  )
                })
              ) : (
                <option value="">لطفا منتظر بمانید</option>
              )}
            </select>
            <div className="text-red-500 text-sm my-1">{sewingError}</div>
            <label
              htmlFor="description"
              className="block my-2 text-sm font-medium text-gray-900 "
            >
              توضیحات و آدرس
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleInputChange}
              name="description"
              id="description"
              cols="30"
              rows="10"
            ></textarea>
            <div className="text-red-500 text-sm my-1">
              {data.errors.description}
            </div>
            {validForm ? (
              <div className="flex justify-center">
                <button
                  className="w-9/12 py-2.5 rounded-lg text-lg text-white bg-blue-500 mt-3 hover:bg-blue-600 "
                  onClick={handleConfirm}
                >
                  تایید و ادامه
                </button>
              </div>
            ) : (
              <div className="w-9/12 py-2.5 rounded-lg flex justify-center text-base text-red-600 bg-red-200 border boeder-red-400  mx-auto mt-3 ">
                لطفا اطلاعات صحیح وارد کنید
              </div>
            )}
            <div className="h-20"></div>
          </div>

          <ConfirmPage confirm={confirm} data={data} click={click} />
          {confirm ? (
            <div
              className={"flex justify-center " + (click ? " hidden " : " ")}
            >
              <button
                className="mb-20 w-9/12 py-2.5 rounded-lg text-lg text-white bg-blue-600 mx-auto mt-3"
                onClick={() => {
                  setClick(true)
                }}
              >
                تایید و ارسال
              </button>
            </div>
          ) : null}
          <div className={" w-80 " + (click ? " " : " hidden")}>
            {success ? (
              <>
                <div className="success-animation">
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </div>
                <div className="flex justify-center my-5">
                  طرح با موفقیت ارسال شد
                </div>
              </>
            ) : (
              <>
                <div className="w-full bg-gray-200 rounded-full ">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full transition-all"
                    style={{ width: persentUpload + "%" }}
                  >
                    {" "}
                    {persentUpload}%
                  </div>
                </div>
                <div className="text-center py-4">
                  ...درحال ارسال لطفا منتظر بمانید
                  {loadIsFull ? (
                    <div className="w-full flex justify-center mt-5">
                      <Loading />
                      درحال اپلود فایل لطفا منتظر بمانید
                    </div>
                  ) : null}
                </div>
                <div className="text-red-500">
                  {errorBackend === null ? null : errorBackend}
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
    // </div>
  )
}
