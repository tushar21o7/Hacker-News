import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalContext from "./contexts/GlobalContext";
import { HomeLayout, Home, Login, Register, Error } from "./pages";

const App = () => {
  return (
    <GlobalContext>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext>
  );
};

export default App;
