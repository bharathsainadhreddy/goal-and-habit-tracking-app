import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Goals from "./components/Goals/Goals";
import Register from "./components/Register/Register";
import { useNavigate } from "react-router-dom";

function App() {
  const isAuthorized = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  const onRegister = () => {
    navigate("/goals");
  };

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/register");
    }
  }, [isAuthorized, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Register onRegister={onRegister} />} />
      <Route path="/register" element={<Register onRegister={onRegister} />} />
      <Route
        path="/goals"
        element={
          isAuthorized ? <Goals /> : <Register onRegister={onRegister} />
        }
      />
      <Route path="*" element={<Register onRegister={onRegister} />} />
    </Routes>
  );
}

export default App;
