import { Outlet, Link } from "react-router-dom";
import QrScanner from "./qrscanner";

const Layout = () => {
  return (
    <>
    <Link to="/participant">Hello</Link>

      <Outlet />
    </>
  )
};

export default Layout;
