import { useNavigate } from "react-router-dom";

const Unauthorized = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">First Login Required</h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 cursor-pointer
">
            ✕
          </button>
        </div>
        <p className="text-gray-600 mb-6">Please log in or sign up to continue.</p>

        <div className="flex gap-4 justify-end">
          <button onClick={() => navigate("/login")} className="px-4 py-2 bg-primary text-white text-sm rounded hover:bg-gray-900 transition- cursor-pointer">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300 transition-colors cursor-pointer">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
