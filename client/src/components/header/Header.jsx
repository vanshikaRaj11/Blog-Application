import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const NavList = () => {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-medium uppercase"
      >
        <Link
          to="/"
          className="flex items-center hover:text-[#00373C] transition-colors"
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-medium uppercase"
      >
        <Link
          to="about"
          className="flex items-center hover:text-[#00373C] transition-colors"
        >
          About
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-medium uppercase"
      >
        <Link
          to="/contact"
          className="flex items-center hover:text-[#00373C] transition-colors"
        >
          Contact
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-medium uppercase"
      >
        <Link
          to="/login"
          className="flex items-center hover:text-[#00373C] transition-colors"
        >
          Logout
        </Link>
      </Typography>
    </ul>
  );
};

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto w-full px-6 py-1 bg-white bg-opacity-100 rounded-none">
      <div className="flex items-center justify-between">
              <img src="/blog.png" alt="logo"  className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full"/>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 text-black" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 text-black" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default Header;
