import MainPage from "./MainPage";
import { Outlet } from 'react-router-dom';
export default function Main() {
  return (
    <MainPage>
      <div className="w-full   mx-auto container">
        <Outlet />
      </div>
    </MainPage>
  );
}
