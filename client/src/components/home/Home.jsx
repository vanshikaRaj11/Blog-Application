import React from "react";
import Banner from "../banner/Banner";
import Category from "./Category";
import Posts from "./post/Posts";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Categories Section */}
        <div className="lg:col-span-2 sm:col-span-2 col-span-12">
          <Category />{" "}
        </div>
        <div className="lg:col-span-10 sm:col-span-10 col-span-12">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Home;
