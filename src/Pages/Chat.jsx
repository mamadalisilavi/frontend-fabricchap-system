import NavChat from "../components/chat/NavChat";
import BodyChat from "../components/chat/BodyChat";
import MenuChat from "../components/chat/MenuChat";

import MainPage from "./MainPage";
export default function Chat() {
  return (
    <MainPage>
      <div className="w-full md:w-9/12 lg:w-1/2  mx-auto container">
        {/* nav chat page */}
        <NavChat />
        <BodyChat />
        <MenuChat />
      </div>
    </MainPage>
  );
}
