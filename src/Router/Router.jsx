import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../components/Auth/Login"));
// import Login from "";
import Signup from "../components/Auth/Signup";
import Home from "../components/Home";
import ProfilePage from "../components/Profile/ProfilePage";
import Loader from "../components/misc/Loader";
import PrivateRoute from "../components/PrivateRoute";
import EditProfile from "../components/Profile/EditProfile";
const NotFound = lazy(() => import("../components/misc/NotFound"));

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/:id/edit" element={<EditProfile />} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
