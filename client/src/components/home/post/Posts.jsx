import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../../../service/api";
// Components
import Post from "./Post";

const Posts = () => {
  const [posts, getPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || "" });
      if (response.isSuccess) {
        getPosts(response.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts?.length ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                to={`details/${post._id}`}
                className="text-black no-underline"
              >
                <Post post={post} />
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-gray-600 my-8 text-center text-lg">
            No data is available for the selected category
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
