import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import ListMenu from "./menu-chat/ListMenu";
import NextPage from "./menu-chat/NextPage";
import FileUpload from "./menu-chat/contents/FileUpload";
import Prices from "./menu-chat/contents/Prices";
import Questions from "./menu-chat/contents/Questions";
export default function MenuChat() {
  const [hidden, setHidden] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  return (
    <div className="fixed bottom-[60px] block w-full md:w-9/12 lg:w-1/2  mx-auto container bg-white">
      <div
        id="menu"
        className="h-full flex flex-col align-baseline w-full    mx-auto container"
      >
        <div className="flex justify-center font-semibold py-3 bg-stone-50">
          <button
            onClick={() => setHidden(!hidden)}
            className="flex w-1/2 justify-center gap-1 items-center focus:outline-none text-white bg-[#25d366] hover:bg-green-600 focus:ring-4 focus:ring-green-700 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
          >
            <IoIosArrowDown
              color="white"
              size={"20px"}
              className={(hidden ? "rotate-180 " : "") + "transition-transform"}
            />
            شروع
          </button>
        </div>
        <div
          className={
            (hidden ? "h-0 " : nextPage === 1 ? "h-96 " : "h-96 ") +
            "bg-stone-100 transition-all duration-300"
          }
        >
          <NextPage
            hidden={hidden}
            id={1}
            nextPage={nextPage}
            setNextPage={setNextPage}
            content={<FileUpload />}
          />
          <NextPage
            hidden={hidden}
            id={2}
            nextPage={nextPage}
            setNextPage={setNextPage}
            content={<Prices />}
          />
          <NextPage
            hidden={hidden}
            id={3}
            nextPage={nextPage}
            setNextPage={setNextPage}
            content={<Questions />}
          />
          <ul
            className={
              (nextPage > 0 ? "hidden " : " ") +
              "flex flex-col justify-center items-center gap-3 p-2"
            }
          >
            <ListMenu id={1} title={"ثبت سفارش"} click={() => setNextPage(1)} />
            <ListMenu id={2} title={"قیمت ها"} click={() => setNextPage(2)} />
            <ListMenu
              id={3}
              title={"سوالات متداول"}
              click={() => setNextPage(3)}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
