import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.clear("accessToken");
    navigate("/");
  };

  return (
    <div className="logout" onClick={handleClick}>
      logout
    </div>
  );
};

export default Logout;
