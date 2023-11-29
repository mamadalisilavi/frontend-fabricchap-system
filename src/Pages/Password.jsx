import { useEffect, useState } from "react"
import api from "../api"
import Cookies from "js-cookie"
import validator from "validator"
import Loading from "../components/Loading"

export default function Password() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState("")
  async function handleSubmitChongePassword(e) {
    e.preventDefault()
    if (submit) {
      await api
        .post(
          "chinge-password",
          { oldPassword, newPassword },
          {
            headers: { Authorization: "Bearer " + Cookies.get("jht4") },
          }
        )
        .then((e) => {
          setSubmit(false)
          window.location.replace("/login")
        })
        .catch((e) => {
          setError(e.response.data.message)
          setSubmit(false)
        })
    }
  }
  const [errorOldPassword, setErrorOldPassword] = useState(
    "لطفا گذرواژه قدیمی را وارد کنید"
  )
  const [errorNewPassword, setErrornewPassword] = useState(
    "لطفا گذرواژه جدید را وارد کنید"
  )
  useEffect(() => {
    if (validator.isEmpty(oldPassword)) {
      setErrorOldPassword("لطفا گذرواژه قدیمی را وارد کنید")
    } else if (!validator.isLength(oldPassword, { min: 8, max: 30 })) {
      setErrorOldPassword("لطفا کاراکتر بین 8 الی 30 باشد.")
    } else {
      setErrorOldPassword("")
    }
    if (validator.isEmpty(newPassword)) {
      setErrornewPassword("لطفا گذرواژه جدید را وارد کنید")
    } else if (!validator.isLength(newPassword, { min: 8, max: 30 })) {
      setErrornewPassword("لطفا کاراکتر بین 8 الی 30 باشد.")
    } else {
      setErrornewPassword("")
    }
  }, [oldPassword, newPassword])
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (Boolean(Cookies.get("jht4"))) {
      async function checkToken() {
        return await api
          .get("checktoken", {
            headers: { Authorization: "Bearer " + Cookies.get("jht4") },
          })
          .then((e) => {
            if (e.data.token) {
              setLoading(true)
              setIsLogin(true)
            } else {
              setLoading(true)
              setIsLogin(false)
            }
          })
          .catch((e) => {
            setLoading(true)
            setIsLogin(false)
          })
      }
      checkToken()
    } else {
      setLoading(true)
      setIsLogin(false)
    }
  }, [])
  if (loading) {
    if (isLogin) {
      return (
        <div>
          <div>
            <div
              className="w-96 flex flex-col mx-auto h-screen items-center justify-center "
              dir="rtl"
            >
              <div className="text-red-600"> {error}</div>
              <div className="font-bold text-2xl mb-6">تغییر گذرواژه</div>
              <form onSubmit={handleSubmitChongePassword} className="w-9/12 ">
                <label
                  className="block mb-2 text-sm  font-medium text-gray-900 "
                  htmlFor="oldPassword"
                >
                  گذرواژه قدیمی
                </label>
                <input
                  onChange={(e) => setOldPassword(e.target.value)}
                  id="oldPassword"
                  type="password"
                  name="oldPassword"
                  placeholder="گذرواژه قدیمی"
                  required
                  className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                <div className="text-red-500 mb-2">{errorOldPassword}</div>
                <label
                  className="block mb-2 text-sm  font-medium text-gray-900 "
                  htmlFor="newPassword"
                >
                  گذرواژه جدید
                </label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  placeholder="گذرواژه جدید"
                  required
                  className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                <div className="text-red-500 mb-2">{errorNewPassword}</div>
                {errorOldPassword === "" && errorNewPassword === "" ? (
                  <button
                    className="block max-w-max my-3 text-white bg-blue-600  font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center"
                    onClick={() => setSubmit(true)}
                  >
                    تغییر گذرواژه
                  </button>
                ) : (
                  <div className="block max-w-max my-3 text-white bg-gray-300  font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center">
                    تغییر گذرواژه
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return window.location.replace("/login")
    }
  } else {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loading />
      </div>
    )
  }
}
