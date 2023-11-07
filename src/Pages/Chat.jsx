import { BsChatLeftDotsFill } from "react-icons/bs";

import NavChat from "../components/chat/NavChat";
import BodyChat from "../components/chat/BodyChat";
import MenuChat from "../components/chat/MenuChat";
export default function Chat() {
  return (
    <div className="w-full md:w-9/12 lg:w-1/2  mx-auto container">
      {/* nav chat page */}
      <NavChat />
      <BodyChat />
      <MenuChat />
      <div
        id="menu-chat"
        className="fixed bottom-0 bg-[#128c7e] p-4 flex w-full md:w-9/12 lg:w-1/2 mx-auto container justify-around"
        dir="rtl"
      >
        <BsChatLeftDotsFill color="white" size={"28px"} />
        <BsChatLeftDotsFill color="white" size={"28px"} />
        <BsChatLeftDotsFill color="white" size={"28px"} />
      </div>
    </div>
  );
}
