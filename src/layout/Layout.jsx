import { Outlet } from "react-router-dom"
import NavBar  from "../components/navbar/Navbar"

const Layout = () => {
  return (
    <div>
    <main>
        <Outlet />
    </main>
    <NavBar />
    </div>
  )
}

export default Layout
