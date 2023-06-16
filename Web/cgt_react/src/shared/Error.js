import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <h1>
      {" "}
      This page does not exist. Please click <Link to="/">here</Link> to return
      to Home.
    </h1>
  );
}

export default ErrorPage;
