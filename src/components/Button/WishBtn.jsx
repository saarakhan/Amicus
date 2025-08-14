import { FaPlus } from "react-icons/fa6";

const WishBtn = () => {
  return (
    <div className="flex justify-center items-center text-center mb-20">
      <button className="md:w-[500px] flex items-center justify-center gap-3 bg-[#302f2d] text-white px-8 py-4 rounded-md text-lg font-semibold shadow-lg hover:bg-[#302f2d]/90 active:scale-95 transition-all duration-200 cursor-pointer font-Mozilla w-[300px]">
        <FaPlus size={20} />
        <span>Share a wish</span>
      </button>
    </div>
  );
};

export default WishBtn;
