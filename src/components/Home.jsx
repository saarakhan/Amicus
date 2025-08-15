import Header from "./Top/Header";
import Navbar from "./Top/Navbar";
import WishBtn from "./Button/WishBtn";
import { Outlet } from "react-router-dom";
import Post from "./Post/Post";
const Home = () => {
  return (
    <div className="">
      <Header />
      <WishBtn />
      <Post />
    </div>
  );
};

export default Home;
