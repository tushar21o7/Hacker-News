import useForm from "../hooks/useForm";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isEmpty, data } = useForm(e.currentTarget);

    if (isEmpty) {
      console.log("please provide all values");
      return;
    }

    try {
      const resp = await axios.post(
        "https://hacker-news-8q32.onrender.com/api/v1/users/register",
        data
      );
      console.log(resp.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Register</h1>
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
        Already registered? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default Register;
