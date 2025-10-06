import "../../Components/footer/footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
       
        <p>
          © {new Date().getFullYear()} Campus Event Organizer – RRC | Team CODING DOCTORS
        </p>

        <div className="footer-team">
          <p><strong>Team Members:</strong> Lovedeep Sidhu • Subhpreet Singh • Amandeep Singh</p>
        </div>

        <nav className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
