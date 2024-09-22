import { useContext } from "react";
import { API } from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";
import { MdDelete } from "react-icons/md";

const Comment = ({ comment, setToggle }) => {
  const { user } = useContext(DataContext);

  const removeComment = async () => {
    await API.deleteComment(comment._id);
    setToggle((prevState) => !prevState);
  };

  return (
    <div className="mt-8 bg-gray-100 p-4 rounded-md">
      <div className="flex items-center mb-2">
        {/* Commenter's name */}
        <h2 className="font-semibold text-lg mr-4">{comment.name}</h2>

        {/* Date of comment */}
        <p className="text-sm text-gray-500">
          {new Date(comment.date).toDateString()}
        </p>

        {/* Delete icon (only for the author of the comment) */}
        {comment.name === user.username && (
          <MdDelete
            className="w-5 h-5 ml-auto cursor-pointer text-gray-600 hover:text-red-600"
            onClick={removeComment}
          />
        )}
      </div>

      {/* Comment body */}
      <p className="text-gray-800">{comment.comments}</p>
    </div>
  );
};

export default Comment;
