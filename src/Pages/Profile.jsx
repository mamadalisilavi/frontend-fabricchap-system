import Cookies from "js-cookie";
import MainPage from "./MainPage";

export default function Profile() {
  function handleLogout() {
    Cookies.remove("jht4");
    window.location.reload();
  }
  return (
    <MainPage>
      <div className="flex flex-col items-center">
        profile
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-800 text-white rounded mx-2 text-base font-bold py-3 w-9/12 md:w-max md:px-14"
        >
          خروج از حساب
        </button>
      </div>
    </MainPage>
  );
}
