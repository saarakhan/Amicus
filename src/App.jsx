import "./App.css";
import Router from "./Router/Router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Top/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Router />
    </>
  );
}

export default App;
