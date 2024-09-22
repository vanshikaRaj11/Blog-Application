import React from "react";

const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

   return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-start h-[400px]">
      <img
        src={url}
        alt="post"
        className="w-full h-[180px] object-cover rounded-t-lg mb-4"
      />
      <p className="text-gray-400 text-xs mb-1">{post.categories || "Uncategorized"}</p>
      <h2 className="text-lg font-semibold mb-1 text-gray-800">
        {addEllipsis(post.title, 25)}
      </h2>
      <p className="text-gray-500 text-sm mb-2">Author: {post.username}</p>
      <p className="text-gray-700 text-sm leading-tight mb-4">
        {addEllipsis(post.description, 80)}
      </p>
    </div>
  );

};

export default Post;
