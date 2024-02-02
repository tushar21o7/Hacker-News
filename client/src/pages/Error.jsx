import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>404 Error</h1>
      <h3>
        Something Went Wrong, Go to <Link to="/">Home</Link>{" "}
      </h3>
    </div>
  );
};

export default Error;
