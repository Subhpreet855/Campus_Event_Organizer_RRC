import "../../Components/header/header.css";
import rrcLogo from "../../assets/Red_River_College_Logo.png";
import heroImage from "../../assets/Hero.jpg";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";

function Header() {
  return (
    <header className="header-container">

      {/* Top Auth Bar */}
      <div className="auth-bar">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Title Section */}
      <div className="logo-title">
        <img src={rrcLogo} alt="RRC Logo" className="rrc-logo" />
        <div className="site-title">
          <h1>CAMPUS EVENT ORGANIZER – RRC</h1>
          <p>Stay connected with campus events at Red River College Polytechnic</p>
        </div>
      </div>

      {/* Hero Section */}
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
