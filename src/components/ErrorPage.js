import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const darkMode = useSelector((state) => state.appSlice.darkMode);
  console.log(darkMode);
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
