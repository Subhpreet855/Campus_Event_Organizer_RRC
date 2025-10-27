import { Outlet } from "react-router";
import NavBar from "./Nav/nav";
import Footer from "../../footer/footer";

export function Layout() {
  return (
    <div className="layout-container">
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer  />
    </div>
  );
}

export default Layout;
