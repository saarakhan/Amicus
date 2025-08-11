import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import { UseAuth } from "../context/AuthContext";

const Router = () => {
  const { isAuthenticated } = UseAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={isAuthenticated ? "home" : <Navigate to="/login" />} />
    </Routes>
  );
};

export default Router;
