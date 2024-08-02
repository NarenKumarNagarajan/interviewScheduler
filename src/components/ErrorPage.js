import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Error Page Not Found</h1>
      <p>
        <Link to="/">Click Here for Dashboard</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
