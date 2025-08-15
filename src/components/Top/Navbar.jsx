import { IoIosSearch } from "react-icons/io";
import { BiGhost } from "react-icons/bi";
import { useState } from "react";
import ProfileModal from "../Profile/ProfileModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="mx-auto bg-white border-b border-gray-300 shadow-sm py-4 px-14 flex items-center justify-between sticky top-0 z-10">
        <div
          className="text-2xl font-Mozilla font-bold text-[#302f2d] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}>
          Amicus
        </div>

        <ul className="space-x-8 text-gray-700 font-medium md:flex hidden font-Mozilla">
          <li className="cursor-pointer transition p-2 rounded-md hover:bg-gray-200 font-Mozilla ">Discover</li>
          <li className="cursor-pointer transition p-2 rounded-md hover:bg-gray-200 font-Mozilla">My Wishes</li>
          <li className="cursor-pointer transition p-2 rounded-md hover:bg-gray-200 font-Mozilla">Granted</li>
        </ul>

        <div className="flex items-center space-x-3 text-gray-500 text-xl">
          <div className="p-2 rounded-md hover:bg-gray-200 hover:scale-110 transition-all duration- cursor-pointer ">
            <IoIosSearch className="text-xl" />
          </div>
          <div
            className="p-2 rounded-md hover:bg-gray-200 hover:scale-110 transition-all duration-300 cursor-pointer "
            onClick={() => {
              setOpenProfileModal(true);
            }}>
            <BiGhost className="text-xl" />
          </div>
        </div>
      </nav>
      {openProfileModal && <ProfileModal onClose={() => setOpenProfileModal(false)} />}
    </>
  );
};

export default Navbar;
