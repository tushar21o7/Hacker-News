import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
