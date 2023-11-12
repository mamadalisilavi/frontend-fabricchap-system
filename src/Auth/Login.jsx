import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import validator from "validator";
import { TbLoader } from "react-icons/tb";
import api from "../api";

export default function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState();
  const [hasErrors, setHasErrors] = useState(true);
  const [numberError, setNumberError] = useState("");
  const [passwordErrors, setPassowrdErrors] = useState("");
  //login
  async function handleSubmitLogin(e) {
    e.preventDefault();
    if (submit) {
      await api
        .post("login", { number, password })
        .then((e) => {
          Cookies.set("jht4", e.data.token, { expires: 30 });
          window.location.reload();
          setSubmit(false);
        })
        .catch((e) => {
          setError(e.response.data.message);
          setSubmit(false);
        });
    }
  }

  function handleChingeNumber(e) {
    setNumber(e.target.value);
  }
  function handleChingePass(e) {
    setPassword(e.target.value);
  }
  //validation
  useEffect(() => {
    if (!validator.isEmpty(number)) {
      if (!validator.isMobilePhone(number, "ir-IR")) {
        setNumberError("شماره موبایل صحیح نمی باشد");
        setHasErrors(true);
      } else {
        setNumberError("");
        setHasErrors(false);
      }
    } else {
      setHasErrors(true);
    }

    if (!validator.isEmpty(password)) {
      if (!validator.isLength(password, { min: 8, max: 30 })) {
        setPassowrdErrors(" لطفا رمز کمتر  از 5 حرف و بیشتر 30 حرف نباشد.");
        setHasErrors(true);
      } else {
        setPassowrdErrors("");
        setHasErrors(false);
      }
    } else {
      setHasErrors(true);
    }
  }, [hasErrors, number, numberError, passwordErrors, password]);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (Boolean(Cookies.get("jht4"))) {
      async function checkToken() {
        return await api
          .get("checktoken", {
            headers: { Authorization: "Bearer " + Cookies.get("jht4") },
          })
          .then((e) => {
            if (e.data.token) {
              setLoading(true);
              setIsLogin(true);
            } else {
              setLoading(true);
              setIsLogin(false);
            }
          })
          .catch((e) => {
            setLoading(true);
            setIsLogin(false);
          });
      }
      checkToken();
    } else {
      setLoading(true);
      setIsLogin(false);
    }
  }, []);

  if (loading) {
    if (isLogin) {
      return window.location.replace("/");
    } else {
      return (
        <div>
          <div
            className="w-96 flex flex-col mx-auto h-screen items-center justify-center "
            dir="rtl"
          >
            <div className="text-red-600"> {error}</div>
            <div className="font-bold text-2xl mb-6">ورود</div>
            <form onSubmit={handleSubmitLogin} className="w-9/12 ">
              <label
                className="block mb-2 text-sm  font-medium text-gray-900 "
                htmlFor="number"
              >
                شماره تلفن
              </label>
              <input
                onChange={handleChingeNumber}
                id="number"
                type="text"
                placeholder="شماره"
                required
                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
              />
              <div className=" my-4">
                <div className="text-red-600 w-[200px]"> {numberError}</div>
              </div>
              <label
                className="block mb-2 text-sm  font-medium text-gray-900 "
                htmlFor="password"
              >
                رمز
              </label>
              <input
                onChange={handleChingePass}
                id="password"
                type="password"
                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                placeholder="رمز"
                required
              />
              <div className="text-red-600 w-[200px]"> {passwordErrors}</div>
              {hasErrors ? (
                <div className="disable-btn"></div>
              ) : (
                <button
                  onClick={() => setSubmit(true)}
                  className="block items-center my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {submit ? <TbLoader className="animate-spin mx-1" /> : "ورود"}
                </button>
              )}
              <Link to={"/register"} className="text-blue-600 hover:underline">
                حساب کاربری ندارید؟ ثبت نام
              </Link>
            </form>
          </div>
        </div>
      );
    }
  } else {
    return <div>loading...</div>;
  }
}
