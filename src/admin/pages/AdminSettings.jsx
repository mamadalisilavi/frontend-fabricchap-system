import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function AdminSettings() {
  return (
    <div>
      AdminSettings
      <div>
        <Link to="fabrics">پارچه ها</Link>
        <Outlet />
      </div>
    </div>
  );
}
