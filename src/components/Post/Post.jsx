import { useState } from "react";
import { postData } from "../../postData";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { UseAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Unauthorized from "../modals/Unauthorized";
import { IoMdSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
const Post = () => {
  const { isAuthenticated } = UseAuth();
  const [posts, setPost] = useState(postData);
  const [expandComment, setExpandComment] = useState(null);
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const toggleLike = id => {
    if (!isAuthenticated) {
      setShowUnauthorized(true);
      return;
    }
    setPost(prevPost =>
      prevPost.map(post =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleComment = id => {
    setExpandComment(prevId => (prevId === id ? null : id));
  };

  const changeHandler = e => {
    setComment(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowUnauthorized(true);
      return;
    }
    setPost(prevPost =>
      prevPost.map(post =>
        post.id === expandComment
          ? {
              ...post,
              replies: post.replies + 1,
              threadReplies: [
                ...post.threadReplies,
                {
                  name: "Saara Khan",
                  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                  text: comment,
                },
              ],
            }
          : post
      )
    );
    setComment("");
  };

  return (
    <>
      {showUnauthorized && <Unauthorized onClose={() => setShowUnauthorized(false)} onLogin={() => navigate("/login")} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6 p-6  bg-gray-50 min-h-screen">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow-lg rounded-xl w-full max-w-sm h-[420px] overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            {/*  clicking on comment should show all comment in place of post*/}

            {expandComment === post.id ? (
              // Comment View
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <button onClick={() => toggleComment(post.id)} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                      <IoArrowBack className="text-lg" />
                      <span className="text-sm font-medium">Back to post</span>
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaRegComment className="text-xs" />
                      <span>{post.replies} comments</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <img src={post.avatar || "/placeholder.svg"} alt={post.name} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{post.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{post.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {post.threadReplies.length === 0 ? (
                    <div className="text-center py-8">
                      <FaRegComment className="mx-auto text-3xl text-gray-300 mb-2" />
                      <p className="text-gray-500 text-sm">No comments yet</p>
                      <p className="text-gray-400 text-xs">Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    post.threadReplies.map((reply, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <img src={reply.avatar || "/placeholder.svg"} alt={reply.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 mb-1">{reply.name}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{reply.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                  <form onSubmit={submitHandler} className="space-y-3">
                    <div className="relative">
                      <input
                        placeholder="Share your thoughts..."
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
                        onChange={changeHandler}
                        value={comment}
                        required
                      />
                      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                        <IoMdSend className="text-lg" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              // Post View
              <div className="h-full flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <img src={post.image || "/placeholder.svg"} className="w-full h-full object-cover" alt="post" />
                  <span
                    className={`absolute top-3 left-3 bg-white/90 backdrop-blur-sm inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm border ${post.tag
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}>
                    {post.tag}
                  </span>
                </div>

                <div className="flex-1 p-4 flex flex-col">
                  <p className="text-gray-800 text-sm mb-4 ">{post.description}</p>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <img src={post.avatar || "/placeholder.svg"} alt={post.name} className="rounded-full h-10 w-10 object-cover border-2 border-gray-200 shadow-sm" />
                    <p className="font-semibold text-gray-800">{post.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.liked ? (
                        <IoMdHeart className="fill-red-500 cursor-pointer text-2xl hover:scale-110 transition-transform" onClick={() => toggleLike(post.id)} />
                      ) : (
                        <IoMdHeartEmpty className="cursor-pointer text-2xl hover:scale-110 hover:text-red-400 transition-all" onClick={() => toggleLike(post.id)} />
                      )}
                      <span className="text-sm font-medium text-gray-600">{post.likes}</span>
                    </div>

                    <button onClick={() => toggleComment(post.id)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group">
                      <FaRegComment className="text-lg text-gray-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">{post.replies}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
