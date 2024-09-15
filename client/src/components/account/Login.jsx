import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";

const Login = () => {
  const [account, setAccount] = useState("true");

  const handleAccount = () => {
    setAccount(!account);
  };
  return (
    <>
      {account ? (
        <div className="w-[400px] m-auto shadow-md shadow-black ">
          <div className="flex justify-center pt-5">
            <img
              src="/blog.png"
              alt="login"
              className="w-28 h-auto rounded-full"
            />
          </div>

          <div className="p-4 flex flex-col space-y-2 gap-2 mt-5">
            <Input
              label="Enter username"
              className="text-gray-800 focus:border-[#00373C]"
            />
            <Input
              label="Enter  password"
              className="text-gray-800 focus:border-[#00373C]"
            />

            <Button className="bg-[#00373C]">Login</Button>

            <p className="text-center">Or</p>

            <Button
              onClick={() => handleAccount()}
              className="bg-blue-50 hover:bg-[#C8A25F] text-black "
            >
              Create an account
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-[400px] m-auto shadow-md shadow-black ">
          <div className="flex justify-center pt-5">
            <img
              src="/blog.png"
              alt="login"
              className="w-28 h-auto rounded-full"
            />
          </div>

          <div className="p-4 flex flex-col space-y-2 mt-5 gap-2">
            <Input
              label="Enter Name"
              className="text-gray-800 focus:border-[#00373C]"
            />
            <Input
              label="Enter username"
              className="text-gray-800 focus:border-[#00373C]"
            />
            <Input
              label="Enter  password"
              className="text-gray-800 focus:border-[#00373C] "
            />

            <Button className="bg-[#00373C]">Sign Up</Button>

            <pc className="text-center">Or</pc>

            <Button
              onClick={() => handleAccount()}
              className="bg-blue-50 hover:bg-[#C8A25F] text-black "
            >
              Already have an account
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
