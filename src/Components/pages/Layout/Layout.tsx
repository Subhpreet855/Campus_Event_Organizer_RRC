import { Outlet } from "react-router";
import NavBar from "./nav/nav";
import Footer from "../../footer/footer";

export function Layout() {
  return (
    <div className="layout-container">
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer team={["Subhpreet Singh", "Amandeep Singh", "Lovedeep Singh Sidhu"]} />
    </div>
  );
}

export default Layout;
