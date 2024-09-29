import { IconButton, Typography } from "@material-tailwind/react";
import { FaGithub, FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const About = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src="/about.png"
          alt="about"
          className="object-cover object-left-bottom h-full w-full"
        />
      </div>

      {/* Wrapper Section */}
      <div className="p-6">
        <Typography variant="h3" className="mt-12">
          Code for Interview
        </Typography>

        <Typography variant="h5" className=" text-gray-800 mt-12">
          I'm a MERN Stack Developer based in India, specialising in backend
          development. <br />I am currenlty employed as Backend Developer at
          Devlupers <br />
          If you are interested, you can view some of my favorite projects here
          <span className="ml-2">
            <a
              href="https://github.com/vanshikaRaj11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton variant="text" className="text-gray-500">
                <FaGithub
                  className="text-2xl md:text-4xl"
                  style={{ color: "#333" }}
                />
              </IconButton>
            </a>
          </span>
        </Typography>

        <Typography variant="h5" className=" text-gray-800 mt-8">
          Reach out to me on
          <span className="ml-2">
            <a
              href="https://www.instagram.com/codeforinterview/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton variant="text">
                <FaInstagramSquare
                  className="text-2xl md:text-4xl"
                  style={{ color: " #E1306C" }}
                />
              </IconButton>
            </a>
          </span>
          or send me an email at
          <a
            href="mailto:vanshikavce19@gmail.com?Subject=This is a subject"
            target="_blank"
            className="ml-2"
            rel="noopener noreferrer"
          >
            <IconButton variant="text" className="text-gray-500">
              <MdEmail
                className="text-2xl md:text-4xl"
                style={{color: "  #4285F4" }}
              />
            </IconButton>
          </a>
          .
        </Typography>
      </div>
    </div>
  );
};

export default About;
