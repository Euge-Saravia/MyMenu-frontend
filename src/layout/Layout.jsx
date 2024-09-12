import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/Navbar";
import Logo from "../components/logo/Logo";

const Layout = () => {
  return (
    <>
      <nav>
        <Logo />
      </nav>
      <main>
        <Outlet />
      </main>
      <NavBar />
    </>
  );
};

export default Layout;
