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
     try {
       const response = await API.getAllComments(post._id);
       if (response.isSuccess) {
         setComments(response.data);
       } else {
         // Handle the error case, e.g., display an error message to the user
         console.error(
           "Error fetching comments:",
           response.error || "Unknown error"
         );
       }
     } catch (error) {
       // Handle network errors or other exceptions
       console.error("Error fetching comments:", error);
     }
   };
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
      <div className="mt-24 flex flex-col md:flex-row gap-2 p-2">
        {/* Profile image */}
        <img
          src={url}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover "
        />

        {/* Comment textarea */}
        <Textarea
          className="w-full p-2"
          label="What's on your mind?"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
          rows={5}
        />
        {/* Post button */}
        <button
          className="h-10 bg-[#00373C] text-white rounded-md px-4 py-2 hover:bg-[#00373C] transition-all md:h-12 md:px-6 lg:h-14 lg:px-8 flex justify-center items-center"
          onClick={(e)=>addComment(e)}
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
