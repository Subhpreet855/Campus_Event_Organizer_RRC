import "../../Components/header/header.css";
import rrcLogo from "../../assets/Red_River_College_Logo.png"; 
import heroImage from "../../assets/Hero.jpg"; 

function Header() {
  return (
    <header className="header-container">
      {/* Top Bar */}
      <div className="header-top">
        <div className="logo-title">
          <img src={rrcLogo} alt="RRC Logo" className="rrc-logo"/>
          <div className="site-title">
            <h1>CAMPUS EVENT ORGANIZER – RRC</h1>
            <p>Stay connected with campus events at Red River College Polytechnic</p>
          </div>
        </div>

        <nav className="header-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Featured</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
      </div>

      <div
        className="header-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-text">
          <h2>Discover & Plan Your Campus Events</h2>
          <p>All your academic, social, and cultural events in one place</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
