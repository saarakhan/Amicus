import { RxCross1 } from "react-icons/rx";
import { BiGhost } from "react-icons/bi";
import loginImg from "../../assets/loginImg.png";
import { TfiSettings, TfiHeart } from "react-icons/tfi";
import { AiOutlineComment } from "react-icons/ai";
import { GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../../context/UserContext";
import { useEffect, useRef } from "react";

const ProfileModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { user } = UseUser();
  const modalRef = useRef();
  // Handle closing of modal when clicked outside.
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  return (
    <div ref={modalRef} className="fixed font-Mozilla top-[60px] right-14 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition cursor-pointer">
        <RxCross1 size={18} />
      </button>

      <div className="flex flex-row gap-2 items-center pb-4 border-b border-gray-200">
        <img src={loginImg} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <p className="text-gray-800 font-semibold">Saara</p>
          <p className="text-gray-500 text-sm">@saru</p>
        </div>
      </div>

      <div className="mt-2 space-y-1 text-gray-700 text-sm font-semibold">
        <div
          className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100 transition"
          onClick={() => {
            navigate(`profile/${user.id}`);
            onClose();
          }}>
          <BiGhost size={18} />
          <span>View Profile</span>
        </div>
        {/* <div
          className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100 transition"
          onClick={() => {
            navigate(`profile/${1}/edit`);
            onClose();
          }}>
          <TfiSettings size={16} />
          <span>Edit Profile</span>
        </div> */}
        {/* <div className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100 transition">
          <TfiHeart size={16} />
          <span>My Wishes</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100 transition">
          <AiOutlineComment size={18} />
          <span>My Comments</span>
        </div> */}
      </div>

      <div className="mt-4 flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-red-50 transition">
        <span>
          <GoSignOut className="text-red-500 " />
        </span>
        <div className=" text-red-500 font-medium  ">Sign out</div>
      </div>
    </div>
  );
};

export default ProfileModal;
