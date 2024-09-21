import { Typography } from "@material-tailwind/react";

const Banner = () => {
  return (
    <div
      className="w-full h-[70vh] flex flex-col items-center justify-center bg-[url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg')] bg-center bg-repeat-x bg-cover"
      style={{ backgroundSize: "55%", backgroundColor: "#000" }}
    >
      <Typography variant="h1" className="text-white text-[70px] leading-tight">
        BLOG
      </Typography>
      <Typography
        variant="h6"
        className="text-black bg-white text-[20px] px-4 py-1"
      >
        Code for Interview
      </Typography>
    </div>
  );
};

export default Banner;
