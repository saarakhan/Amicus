import { useRef, useState,  } from "react";
import { UseUser } from "../../context/UserContext";
import BreadCrumbs from "../misc/BreadCrumbs";
import {useLocation, useParams} from 'react-router-dom'
 const EditProfile = () => {
  const path = useLocation();
  const {id} = useParams();
  const { user, editUser } = UseUser();
  const [formData, setFormData] = useState({
    avatar: null,
    avatarPreview: user.avatarUrl,
    name: user.name,
    username: user.username,
    bio: user.bio,
  });

  const fileInputRef = useRef();

  const changeHandler = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const avatarChangeHandler = e => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // create a preview URL
      setFormData(prev => ({
        ...prev,
        avatar: file,
        avatarPreview: previewUrl,
      }));
    }
  };
  const submitHandler = e => {
    e.preventDefault();
    // update user with formData
    editUser(formData);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <BreadCrumbs path={path.pathname} id={id}/>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit Profile</h1>
        <p className="text-gray-600 mb-8 text-base">Update your profile information and preferences</p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-800 mb-3">Profile Picture</label>
            <div className="flex items-center space-x-5 mb-2">
              <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border">
                <img src={formData.avatarPreview} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="inline-flex items-center px-4 py-2 bg-gray-100 border rounded-md text-gray-700 font-medium hover:bg-gray-200 shadow">
                Change Photo
              </button>
              <input ref={fileInputRef} type="file" name="avatar" id="avatar" className="hidden" accept="image/png,image/jpeg,image/gif" onChange={avatarChangeHandler} />
            </div>
            <div className="text-xs text-gray-400">JPG, PNG or GIF. Max size 5MB.</div>
          </div>

          {/* Display Name */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1" htmlFor="name">
              Display Name
            </label>
            <input
              className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:ring focus:ring-primary focus:outline-none"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Your Name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1" htmlFor="username">
              Username
            </label>
            <div className="flex rounded-md overflow-hidden border">
              <span className="bg-gray-50 px-3 py-2 text-gray-500">@</span>
              <input className="flex-1 px-3 py-2 focus:outline-none" type="text" name="username" id="username" value={formData.username} onChange={changeHandler} placeholder="yourname" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1" htmlFor="bio">
              Bio
            </label>
            <textarea
              className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:ring focus:ring-primary focus:outline-none"
              name="bio"
              id="bio"
              rows={3}
              value={formData.bio}
              onChange={changeHandler}
              placeholder="Write something about yourself..."
            />
          </div>

          <div className="pt-4">
            <button className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold text-base shadow" type="submit">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
