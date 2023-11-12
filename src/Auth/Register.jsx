import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import validator from "validator";
import { BsCheckCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { TbLoader } from "react-icons/tb";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "js-cookie";
export default function Register() {
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setPasswordConfirm] = useState();

  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //validations
  const [validateName, setValidateName] = useState("");
  const [isNameHasError, setIsNameHasError] = useState(false);
  const [validateNumber, setValidateNumber] = useState("");
  const [isNumberHasError, setIsNumberHasError] = useState(false);
  const [isNameUnique, setIsNameUnique] = useState(false);
  const [isNameUniqueLoading, setIsNameUniqueLoading] = useState(false);
  const [isNameBlur, setIsNameBlur] = useState(false);
  const [isNameUniqueMessage, setIsNameUniqueMessage] = useState("");
  const [isNumberUnique, setIsNumberUnique] = useState(false);
  const [isNumberUniqueLoading, setIsNumberUniqueLoading] = useState(false);
  const [isNumberBlur, setIsNumberBlur] = useState(false);
  const [isNumberUniqueMessage, setIsNumberUniqueMessage] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [isPasswordHasError, setIsPasswordHasError] = useState(false);
  const [validatePasswordConfirm, setValidatePasswordConfirm] = useState("");
  const [isPasswordConfirmHasError, setIsPasswordConfirmHasError] =
    useState(false);

  const [numberError, setNumberError] = useState("");
  const [hasError, setHasErrors] = useState(false);
  //handle Number blur for checking Number is unique
  async function handleNumberBlur() {
    setIsNumberBlur(true);
    setIsNumberUnique(false);
    setIsNumberUniqueLoading(false);
    return await api
      .post("checkNumberIsUnique", { number })
      .then((e) => {
        if (e.data.status) {
          setIsNumberUnique(true);
          setIsNumberUniqueLoading(true);
        } else {
          setIsNumberUnique(false);
          setIsNumberUniqueLoading(true);
        }
      })
      .catch((e) => {
        setIsNumberUnique(false);
        setIsNumberUniqueLoading(true);
      });
  }

  //handle name blur for checking name is unique
  async function handleNameBlur() {
    setIsNameBlur(true);
    setIsNameUnique(false);
    setIsNameUniqueLoading(false);
    return await api
      .post("checkUserNameIsUnique", { name })
      .then((e) => {
        if (e.data.status) {
          setIsNameUnique(true);
          setIsNameUniqueLoading(true);
        } else {
          setIsNameUnique(false);
          setIsNameUniqueLoading(true);
        }
      })
      .catch((e) => {
        setIsNameUnique(false);
        setIsNameUniqueLoading(true);
      });
  }

  async function submitRegister(e) {
    e.preventDefault();
    async function register() {
      return await api
        .post("register", {
          name,
          number,
          password,
          password_confirmation: confirmPassword,
          customer: window.localStorage.getItem("customer"),
        })
        .then((e) => {
          window.location.replace("/login");
        })
        .catch((e) => {
          setErrorMessage(e.response.data.message);
        });
    }
    register();
  }
  function handleName(e) {
    return setName(e.target.value);
  }
  function handleNumber(e) {
    return setNumber(e.target.value);
  }
  function handlePassowrd(e) {
    return setPassword(e.target.value);
  }
  function handlePassowrdConfirm(e) {
    return setPasswordConfirm(e.target.value);
  }

  // useEffect(() => {
  //   //name validator
  //   if (!validator.isEmpty(name)) {
  //     setIsNameHasError(false)
  //     if (validator.isEmpty(name)) {
  //       setIsNameHasError(true)
  //       setIsError(true)
  //     }
  //     if (!validator.isAlphanumeric(name, "en-US", { ignore: " -_" }) && !validator.isAlphanumeric(name, "fa-IR", { ignore: " -_" })) {
  //       setIsError(true)
  //       setIsNameHasError(true)
  //       setValidateName('لطفا از حروف و اعداد فارسی یا لاتینی استفاده کنید.')
  //     } else if (!validator.isLength(name, { min: 2, max: 25 })) {
  //       setIsError(true)
  //       setIsNameHasError(true)
  //       setValidateName('لطفا اسم بین 2 تا 25 حرف باشد')
  //     } else {
  //       setIsNameHasError(false)
  //       setValidateName('')
  //     }
  //     if (!isNameHasError) {
  //       //checking name is unique
  //       if (isNameBlur) {
  //         if (isNameUniqueLoading) {
  //           if (isNameUnique) {
  //             setIsNameUniqueMessage(<BsCheckCircleFill color="green" size={"18px"} className="mx-2 absolute" />)
  //           } else {
  //             setIsNameUniqueMessage(<div className="bg-red-600 p-2 rounded-full absolute mx-2 "><ImCross color="white" size={"12px"} /></div>)
  //           }
  //         } else {
  //           setIsNameUniqueMessage(<TbLoader className="mx-2 absolute animate-spin " />)
  //         }
  //       }
  //     }
  //   } else {
  //     setIsError(true)
  //   }

  //   //Number validator
  //   if (!validator.isEmpty(number)) {
  //     setIsNumberHasError(false)
  //     if (validator.isEmpty(number)) {
  //       setIsNumberHasError(true)
  //       setIsError(true)
  //     }
  //     if (!validator.isMobilePhone(number, 'ir-IR')) {
  //       setNumberError('شماره موبایل صحیح نمی باشد')
  //       setHasErrors(true)
  //   } else {
  //       setNumberError('')
  //       setHasErrors(false)
  //   }
  //     if (isNumberHasError) {
  //       setIsNumberBlur(false)
  //     }
  //     if (!isNumberHasError) {
  //       //checking Number is unique
  //       if (isNumberBlur) {
  //         if (isNumberUniqueLoading) {
  //           if (isNumberUnique) {
  //             setIsNumberUniqueMessage(<BsCheckCircleFill color="green" size={"18px"} className="mx-2 absolute" />)
  //           } else {
  //             setIsNumberUniqueMessage(<div className="bg-red-600 p-2 rounded-full absolute mx-2 "><ImCross color="white" size={"12px"} /></div>)
  //           }
  //         } else {
  //           setIsNumberUniqueMessage(<TbLoader className="mx-2 absolute animate-spin " />)
  //         }
  //       }
  //     }
  //   } else {
  //     setIsError(true)
  //   }
  //   //passowrd validator
  //   if (!validator.isEmpty(password)) {
  //     setIsPasswordHasError(false)
  //     if (validator.isEmpty(password)) {
  //       setIsPasswordHasError(true)
  //       setIsError(true)
  //     }
  //     if (!validator.isLength(password, { min: 8, max: 30 })) {
  //       setIsError(true)
  //       setIsPasswordHasError(true)
  //       setValidatePassword('لطفا رمز بین 8 تا 30 حرف و عدد باشد')
  //     } else {
  //       setIsPasswordHasError(false)
  //       setValidatePassword('')
  //     }
  //   } else {
  //     setIsError(true)
  //   }
  //   //confirmation passowrd validator
  //   if (!validator.isEmpty(confirmPassword)) {
  //     setIsPasswordConfirmHasError(false)
  //     if (validator.isEmpty(confirmPassword)) {
  //       setIsPasswordConfirmHasError(true)
  //       setIsError(true)
  //     }
  //     if (!validator.isLength(confirmPassword, { min: 8, max: 30 })) {
  //       setIsError(true)
  //       setIsPasswordConfirmHasError(true)
  //       setValidatePasswordConfirm('لطفا رمز بین 8 تا 30 حرف و عدد باشد')
  //     } else {
  //       setIsPasswordConfirmHasError(false)
  //       setValidatePasswordConfirm('')
  //     }
  //     if (password !== confirmPassword) {
  //       setIsError(true)
  //       setIsPasswordConfirmHasError(true)
  //       setValidatePasswordConfirm('رمز ها مطابق نیست')
  //     }
  //   } else {
  //     setIsError(true)
  //   }
  //   if (isNumberHasError || isNameHasError || isPasswordHasError || isPasswordConfirmHasError || !isNumberUnique || !isNameUnique || validator.isEmpty(password) || validator.isEmpty(confirmPassword)) {
  //     setIsError(true)
  //   } else {
  //     setIsError(false)
  //   }
  //   if (isError) {
  //     setIsSubmit(false)
  //   }
  // }, [name, number, password, confirmPassword, isNumberBlur, isNumberUnique, isNumberUniqueLoading, isNumberHasError, isError, isNameHasError, isPasswordHasError, isPasswordConfirmHasError, isNameBlur, isNameUnique, isNameUniqueLoading])
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
  const [next, setNext] = useState(false);
  function handleNext(customer) {
    window.localStorage.setItem("customer", customer);
    setNext(true);
  }
  if (loading) {
    if (isLogin) {
      return window.location.replace("/");
    } else {
      return (
        <div>
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
                  onChange={handleName}
                  className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                <label className="label mt-5" htmlFor="name">
                  شماره تلفن
                </label>
                <input
                  type="text"
                  onChange={handleNumber}
                  className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                <label className="label " htmlFor="name">
                  گذرواژه
                </label>
                <input
                  type="password"
                  onChange={handlePassowrd}
                  className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                <label className="label " htmlFor="name">
                  تکرار گذرواژه
                </label>
                <input
                  type="password"
                  onChange={handlePassowrdConfirm}
                  className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
                />
                <div className="flex items-center">
                  <button className="block max-w-max my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center">
                    ثبت نام
                  </button>
                  <Link
                    to={"/login"}
                    className="text-blue-500 hover:underline mx-5"
                  >
                    حساب کاربری دارید؟ ورود
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <div>loading...</div>;
  }
}
