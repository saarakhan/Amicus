import { UseUser } from "../../context/UserContext";
import WishBtn from "../Button/WishBtn";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { GoPlus } from "react-icons/go";
const ProfilePage = () => {
  const { user } = UseUser();
  const { id } = useParams();
  const navigate = useNavigate();
  if (!user) {
    return <main className="bg-gray-50 py-10 text-center text-gray-500">Loading profile...</main>;
  }

  return (
    <main className="bg-gray-50 py-10">
      <section className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500">@{user.username}</p>
          <p className="mt-2 text-gray-700 italic text-center max-w-xl">{user.bio}</p>
          <p className="text-gray-400 text-sm mt-1">Joined: {user.joined}</p>
          <div className="flex gap-2">
            <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-900 transition text-sm cursor-pointer flex gap-2">
              <GoPlus className="translate-y-0.5" />
              Create a Wish</button>
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-900 transition text-sm cursor-pointer flex gap-2"
              onClick={() => {
                navigate(`/profile/${id}/edit`);
              }}>
              <MdOutlineEdit className="translate-y-0.5" />
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 mt-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">My Wishes</h2>

        {user?.wishes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.wishes.map(wish => (
              <div key={wish.id} className="rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition">
                {wish.image && <img src={wish.image} alt={wish.tag || "Wish"} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  {wish.tag && <span className="text-sm font-medium text-gray-700 block mb-1">{wish.tag}</span>}
                  {wish.content && <p className="text-gray-700 text-sm">{wish.content}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">
            <h2>No wishes yet.</h2>
            <div className="mt-2">
              <WishBtn />
            </div>
          </p>
        )}
      </section>
    </main>
  );
};

export default ProfilePage;
