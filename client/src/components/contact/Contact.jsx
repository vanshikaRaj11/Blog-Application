import { IconButton, Typography } from "@material-tailwind/react"; // Material Tailwind components
import { FaInstagramSquare } from "react-icons/fa"; // Import icons from react-icons
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
        className="bg-cover bg-center h-[70vh] w-full"
        style={{ backgroundImage: "url(http://mrtaba.ir/image/bg2.jpg)" }}
      ></div>

      {/* Wrapper Section */}
      <div className="p-6 container text-center">
        <Typography variant="h3" className="mt-12">
          Getting in touch is easy!
        </Typography>

        <Typography variant="h5" className=" text-gray-800 mt-8">
          Reach out to me by sending me an email at
          <a
            href="mailto:vanshikavce19@gmail.com?Subject=This is a subject"
            target="_blank"
            className="ml-2"
            rel="noopener noreferrer"
          >
            <IconButton variant="text" className="text-gray-500">
              <MdEmail
                className="text-2xl md:text-4xl"
                style={{ color: "  #4285F4" }}
              />
            </IconButton>
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default Contact;
