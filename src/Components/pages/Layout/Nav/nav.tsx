import { NavLink } from "react-router-dom";
import "./nav.css";
import NotFound from "../../NotFound/NotFound";
import FeaturedEvent from "../../../featured-event/FeaturedEvent";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="nav-title">Campus Event Organizer</h1>
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Featured"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            FeaturedEvents
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
