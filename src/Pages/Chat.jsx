import NavChat from "../components/chat/NavChat";
import BodyChat from "../components/chat/BodyChat";
import MenuChat from "../components/chat/MenuChat";

import MainPage from "./MainPage";
export default function Chat() {
  return (
    <MainPage>
      <div className="w-full   mx-auto container">
        {/* nav chat page */}
        <NavChat />
        <BodyChat />
        <MenuChat />
      </div>
    </MainPage>
  );
}
