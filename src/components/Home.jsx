import Header from "./Top/Header";
import Navbar from "./Top/Navbar";
import WishBtn from "./Button/WishBtn";
import Post from "./Post/Post";
const Home = () => {
  return (
    <div className="">
      {/* NAVBAR */}
      <Navbar />
      {/* HEADER */}
      <Header />
      {/* WISH BUTTON */}
      <WishBtn />
      {/* Rendering all posts */}
      <Post />
    </div>
  );
};

export default Home;
