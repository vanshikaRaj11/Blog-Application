import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { API } from "../service/api";
import { DataContext } from "../context/DataProvider";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { user } = useContext(DataContext);

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    setFile(file); // Set file to state

    const data = new FormData();
    data.append("name", file.name); // Name is optional but good practice
    data.append("file", file); // File should be appended like this

    // Upload file
    const response = await API.uploadFile(data); // API.uploadFile is correct
    console.log(response.data);
    
    if (response && response.data.imageUrl) {
      setPost({ ...post, picture: response.data.imageUrl }); // Set uploaded image URL to post.picture
    }
  }
};


  useEffect(() => {
    post.categories = location.search?.split("=")[1] || "All";
    post.username = user.username;
  }, [location.search, user.username]);

  const savePost = async () => {
    await API.createPost(post); // Call createPost API after image upload
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-4 mt-8 md:mx-24">
      {/* Image Section */}
      <img
        src={url}
        alt="post"
        className="w-full h-96 object-cover mb-6 rounded"
      />

      {/* Form Controls */}
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="fileInput" className="cursor-pointer">
          <IoMdAddCircleOutline className="h-8 w-8 text-gray-500" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange} // Trigger file upload on change
        />
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#00373C] text-xl"
          onChange={handleChange}
        />
        <button
          onClick={savePost}
          className="bg-[#00373C] hover:bg-[#0a1f1f] text-white font-semibold py-2 px-4 rounded"
        >
          Publish
        </button>
      </div>

      {/* Text Area */}
      <textarea
        className="w-full h-60 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#00373C] text-lg"
        placeholder="Tell your story..."
        name="description"
        onChange={handleChange}
      />
    </div>
  );
};

export default CreatePost;
