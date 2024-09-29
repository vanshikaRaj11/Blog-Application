import { useState, useEffect, useContext } from "react";
import { Textarea } from "@material-tailwind/react"; // Material Tailwind textarea
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

// components
import Comment from "./Comment";

const initialValue = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png"; // Default profile picture

  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { user } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComments(response.data);
      }
    }
    getData();
  }, [toggle, post]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: user.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async () => {
    await API.newComment(comment);
    setComment(initialValue);
    setToggle((prevState) => !prevState);
  };

  return (
    <div>
      <div className="mt-24 flex">
        {/* Profile image */}
        <img
          src={url}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Comment textarea */}
        <Textarea
          className="ml-4 w-full"
          label="What's on your mind?"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
          rows={5}
        />

        {/* Post button */}
        <button
          className="ml-4 h-10 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-all"
          onClick={addComment}
        >
          Post
        </button>
      </div>

      {/* Displaying list of comments */}
      <div className="mt-6">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              setToggle={setToggle}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
