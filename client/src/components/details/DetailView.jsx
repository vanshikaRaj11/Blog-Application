import { useState, useEffect, useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

// Components
import Comments from "./comments/Comments";

const DetailView = () => {
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [post, setPost] = useState({});
  const { user } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]);

  const deleteBlog = async () => {
    await API.deletePost(post._id);
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image Section */}
      <img
        src={post.picture || url}
        alt="post"
        className="w-full h-[50vh] object-cover rounded-lg mb-6"
      />

      {/* Action Buttons (Edit/Delete) */}
      <div className="flex justify-end mb-4">
        {user.username === post.username && (
          <div className="flex space-x-4">
            <Link to={`/update/${post._id}`} className="text-blue-500">
              <MdEdit className="w-6 h-6 cursor-pointer" />
            </Link>
            <MdDelete
              className="w-6 h-6 text-red-500 cursor-pointer"
              onClick={deleteBlog}
            />
          </div>
        )}
      </div>

      {/* Post Title */}
      <h1 className="text-4xl font-bold text-center mb-6">{post.title}</h1>

      {/* Author Information */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-gray-600 mb-6">
        <Link
          to={`/?username=${post.username}`}
          className="text-blue-600 hover:underline"
        >
          Author: <span className="font-semibold">{post.username}</span>
        </Link>
        <span>{new Date(post.createdDate).toDateString()}</span>
      </div>

      {/* Post Description */}
      <p className="text-gray-800 leading-relaxed mb-6">{post.description}</p>

      {/* Comments Section */}
      <Comments post={post} />
    </div>
  );
};

export default DetailView;
