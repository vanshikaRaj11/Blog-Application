import React, { useState, useEffect } from "react";
import { Textarea, Input, Button, IconButton } from "@material-tailwind/react";
import { CloudUploadIcon } from "@heroicons/react/outline"; // Heroicon for the upload button
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../service/api";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const UpdatePost = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");

  const { id } = useParams();

  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        if (response.isSuccess) {
          post.picture = response.data;
          setImageURL(response.data);
        }
      }
    };
    getImage();
  }, [file]);

  const updateBlogPost = async () => {
    await API.updatePost(post);
    navigate(`/details/${id}`);
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 mt-12">
      {/* Image */}
      <img
        src={post.picture || url}
        alt="post"
        className="w-full h-96 object-cover rounded-md"
      />

      {/* File Input and Title */}
      <div className="mt-6 flex items-center">
        <label htmlFor="fileInput" className="cursor-pointer">
          <IconButton>
            <CloudUploadIcon className="h-6 w-6" />
          </IconButton>
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Input
          variant="standard"
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Title"
          className="ml-4 w-full text-lg"
        />
        <Button
          onClick={updateBlogPost}
          className="ml-4 bg-blue-500 text-white hover:bg-blue-600"
        >
          Update
        </Button>
      </div>

      {/* Description Textarea */}
      <Textarea
        className="mt-8 w-full"
        label="Tell your story..."
        name="description"
        rows={6}
        value={post.description}
        onChange={handleChange}
      />
    </div>
  );
};

export default UpdatePost;
