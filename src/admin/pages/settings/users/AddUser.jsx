import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { TbLoader } from "react-icons/tb";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "js-cookie";
import api from './../../../../api';
import Loading from './../../../../components/Loading';
import NavSettings from "../../../components/NavSettings";

export default function AddUser() {
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState()
  const [isLogin, setIsLogin] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const [data, setData] = useState({
    name: '',
    number: '',
    password: '',
    password_confirmation: '',
    errors:{
      name: 'لطفا نام را وارد کنید.',
    number: 'لطفا شماره تلفن را وارد کنید.',
    password: "لطفا گذرواژه را وارد کنید.",
    password_confirmation: ".لطفا گذرواژه را تایید کنید",
    }
  })
  async function submitRegister(e) {
    e.preventDefault();
    if(submit){
      async function register() {
        return await api
          .post("register", {
            name: data.name,
            number: data.number,
            password: data.password,
            password_confirmation: data.password_confirmation,
            customer: window.localStorage.getItem("customer"),
          })
          .then((e) => {
           // window.localStorage.getItem("remove")
            window.location.replace("/admin/settings/users");
            setLoading(true)
          })
          .catch((e) => {
            setErrorMessage(e.response.data.message)
            setLoading(true)
          });
      }
      register()
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
    const validateInput = (fieldName, value) => {
      switch (fieldName) {
        case "name":
         if(validator.isEmpty(value)){
          return "لطفا نام را وارد کنید."
         }else if(!validator.isLength(value,{min:2,max:20})){
          return "لطفا تعداد حروف نام بین 2 الی 20 حرف باشد."
         }else{
          return ""
        }
        case "number":
          if(validator.isEmpty(value)){
            return "لطفا شماره تلفن را وارد کنید."
          }else if(!validator.isNumeric(value) && parseInt(value) <= 0){
            return "لطفا عدد صحیح  را وارد کنید."
          }else if(!validator.isMobilePhone(value, "ir-IR")){
            return "لطفا شماره تلفن صحیحی وارد کنید."
          }else{
            return ""
          }
          case "password":
            if(validator.isEmpty(value)){
              return "لطفا گذرواژه را وارد کنید."
            }else if(!validator.isLength(value, { min: 8, max: 30 })){
              return "لطفا گذرواژه بین 5 الی 30 کاراکتر باشد."
            }else{
              return ""
            }
            case "password_confirmation":
              if(validator.isEmpty(value)){
                return ".لطفا گذرواژه را تایید کنید"
              }else if(value !== data.password){
                return "لطفا رمز های متطابق وارد کنید."
              }else if(!validator.isLength(value, { min: 8, max: 30 })){
                return "لطفا گذرواژه بین 5 الی 30 کاراکتر باشد."
              }else{
                return ""
              }
         default :
         return ""
      }
    }

  useEffect(() => {
    // if (Boolean(Cookies.get("jht4"))) {
    //   async function checkToken() {
    //     return await api
    //       .get("checktoken", {
    //         headers: { Authorization: "Bearer " + Cookies.get("jht4") },
    //       })
    //       .then((e) => {
    //         if (e.data.token) {
    //           setLoading(true);
    //           setIsLogin(true);
    //         } else {
    //           setLoading(true);
    //           setIsLogin(false);
    //         }
    //       })
    //       .catch((e) => {
    //         setLoading(true);
    //         setIsLogin(false);
    //       });
    //   }
    //   checkToken();
    // } else {
    //   setLoading(true);
    //   setIsLogin(false);
    // }
  }, []);
  useEffect(()=>{
    if (
      Object.values(data.errors).every((error) => error === "")
    ) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  },[data])
  const [next, setNext] = useState(false);
  function handleNext(customer) {
    window.localStorage.setItem("customer", customer);
    setNext(true);
  }
//   if (loading) {
    // if (isLogin) {
    //   return window.location.replace("/");
    // } else {
      return (
        <div>
            <NavSettings title={"افزودن کاربر"} back={"/admin/settings/users"} />
          <div className={next ? "hidden" : "block"} dir="rtl">
            <div className="flex flex-col justify-center items-center w-full h-screen gap-4">
              <div className="font-bold text-2xl mb-6">نوع ثبت نام</div>
              <button
                onClick={() => handleNext(1)}
                className="group flex justify-between items-center bg-orange-500 border border-orange-600 hover:bg-orange-700  transition-all duration-300 text-2xl text-white text-right px-6 w-96 py-3 rounded-lg"
              >
                ثبت نام بعنوان مشتری
                <FiArrowLeft className="group-hover:-translate-x-2 transition-all duration-300" />
              </button>
              <button
                onClick={() => handleNext(0)}
                className="group flex justify-between items-center bg-blue-600 border border-blue-700 hover:bg-blue-800  transition-all duration-300 text-2xl text-white text-right px-6 w-96 py-3 rounded-lg"
              >
                ثبت نام بعنوان همکار
                <FiArrowLeft className="group-hover:-translate-x-2 transition-all duration-300" />
              </button>
            </div>
          </div>
          <div className={next ? "block" : "hidden"}>
            <div className="text-red-600 py-3 text-center">{errorMessage}</div>
            <div
              className=" flex flex-col mx-auto h-screen items-center justify-center "
              dir="rtl"
            >
              <div className="font-bold text-2xl mb-6">ثبت نام</div>
              <form onSubmit={submitRegister} className="w-9/12 lg:w-1/5">
                <label className="label " htmlFor="name">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                <div className="text-red-500 mb-5">
                  {data.errors.name}
                </div>
                <label className="label mt-5" htmlFor="name">
                  شماره تلفن
                </label>
                <input
                  type="text"
                  name="number"
                  onChange={handleInputChange}
                  className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                  <div className="text-red-500 mb-5">
                  {data.errors.number}
                </div>
                <label className="label " htmlFor="name">
                  گذرواژه
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                  <div className="text-red-500 mb-5">
                  {data.errors.password}
                </div>
                <label className="label " htmlFor="name">
                  تکرار گذرواژه
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={handleInputChange}
                  className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                 <div className="text-red-500 mb-5">
                  {data.errors.password_confirmation}
                </div>
                <div className="flex items-center">
                  {
                    validForm ?
                    <button type="submit" onClick={()=>{
                      setSubmit(true)
                    }} className="block max-w-max my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center">
                     {
                      submit ? <TbLoader className="animate-spin mx-1" /> : "ثبت نام"
                     }
                    </button>
                    :
                    <div  className="block max-w-max my-3 text-white bg-gray-300  font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center">
                      ثبت نام
                    </div>
                  }
                 
                  {/* <Link
                    to={"/login"}
                    className="text-blue-500 hover:underline mx-5"
                  >
                    حساب کاربری دارید؟ ورود
                  </Link> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
//   }
//    else {
//    return <div className="flex justify-center items-center h-screen w-full">
//     <Loading />
//   </div>
//   }
// }
