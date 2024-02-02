import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import Logout from "./Logout";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();

  return (
    <div className="navbar">
      <NavLink to="/" className="logo">
        Hacker News
      </NavLink>

      {isLoggedIn ? (
        <span onClick={() => setIsLoggedIn(false)}>
          <Logout />
        </span>
      ) : (
        <div>
          <NavLink to="/login" className="login">
            login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
