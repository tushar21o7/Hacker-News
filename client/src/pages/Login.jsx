import useForm from "../hooks/useForm";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isEmpty, data } = useForm(e.currentTarget);

    if (isEmpty) {
      console.log("Please provide all values");
      return;
    }

    try {
      const resp = await axios.post(
        "https://hacker-news-8q32.onrender.com/api/v1/users/login",
        data
      );

      const {
        accessToken,
        user: { _id },
      } = resp.data.data;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("userId", _id);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Login</h1>
        <div>
          <label htmlFor="username">Username: </label>
        </div>
        <input
          type="text"
          id="username"
          name="username"
          className="input-field"
        />
      </div>
      <div>
        <div>
          <label htmlFor="password">Password: </label>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          className="input-field"
        />
      </div>
      <button className="submit-btn" type="submit">
        Submit
      </button>
      <div>
        Not registered? <Link to="/register">Register</Link>
      </div>
    </form>
  );
};

export default Login;
