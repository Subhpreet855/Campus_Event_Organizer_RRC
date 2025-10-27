import notFoundImage from "../../../assets/page-not-found-error.jpg";

export function NotFound() {
  return (
    <div className="not-found-container">
      <img
        src={notFoundImage}
        alt="Page Not Found"
        className="not-found-image"
      />
      <p className="not-found-text">This page is not available.</p>
    </div>
  );
}

export default NotFound;
