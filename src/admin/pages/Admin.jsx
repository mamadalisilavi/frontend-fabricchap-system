import { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (Boolean(Cookies.get("jht4"))) {
      async function checkToken() {
        return await api
          .get("isAdmin", {
            headers: { Authorization: "Bearer " + Cookies.get("jht4") },
          })
          .then((e) => {
            if (e.data.status) {
              setLoading(true);
              setIsAdmin(true);
            } else {
              setLoading(true);
              setIsAdmin(false);
            }
          })
          .catch((e) => {
            setLoading(true);
            setIsAdmin(false);
          });
      }
      checkToken();
    } else {
      setLoading(true);
      setIsAdmin(false);
    }
  }, []);

  if (loading) {
    if (isAdmin) {
      return (
        <div className="flex flex-col gap-4 items-center justify-center mt-20 md:flex-row">
          <div className="flex flex-col md:flex-row items-center justify-center ">
            <Link
              className="flex justify-center items-center w-52 h-52 rounded-lg text-xl text-white bg-blue-600 "
              to="/admin/settings"
            >
              settings
            </Link>
          </div>
          <div className="flex flex-col  md:flex-row items-center justify-center">
            <Link
              className="flex justify-center items-center w-52 h-52 rounded-lg text-xl text-white bg-orange-600 "
              to="/admin/settings"
            >
              plats
            </Link>
          </div>
          <div className="flex flex-col  md:flex-row items-center justify-center">
            <Link
              className="flex justify-center items-center w-52 h-52 rounded-lg text-xl text-white bg-green-600 "
              to="/admin/settings"
            >
              fainance
            </Link>
          </div>
        </div>
      );
    } else {
      return window.location.replace("/");
    }
  } else {
    return <div>loading</div>;
  }
}
