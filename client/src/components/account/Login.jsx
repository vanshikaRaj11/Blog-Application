import { Button, Input } from "@material-tailwind/react";
import React, { useState, useContext } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [account, setAccount] = useState("true");
  const [signUp, setSignUp] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [login, setLogin] = useState({
    name: "",
    password: "",
  });

  const { setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const handleAccount = () => {
    setAccount(!account);
  };

  const onInputchange = (e) => {
    console.log(e.target.name, e.target.value);
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const loginUser = async () => {
    let response = await API.userLogin(login);
    console.log(response);

    if (response.isSuccess) {
      toast.success("Log in successful!");
      setLogin({
        name: "",
        password: "",
      });
      setAccount(!account); // Switch back to login on success

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setUser({ username: response.data.username, name: response.data.name });
      setIsAuthenticated(true);
      navigate("/");
    } else {
      toast.error(response?.msg || "Sign up failed. Please try again.");
    }
  };
  const signUpUser = async () => {
    try {
      let response = await API.userSignup(signUp);
      console.log(response);

      if (response.isSuccess) {
        toast.success("Sign up successful!");
        setSignUp({
          name: "",
          username: "",
          password: "",
        });
        setAccount(!account); // Switch back to login on success
      } else {
        toast.error(response?.msg || "Sign up failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      {account ? (
        <div className="w-[300px] mt-16 m-auto shadow-md shadow-black min-w-[300px] sm:min-w-[400px] lg:min-w-[500px]">
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
              name="username"
              value={login.username}
              onChange={(e) => onValueChange(e)}
            />
            <Input
              label="Enter  password"
              className="text-gray-800 focus:border-[#00373C]"
              name="password"
              value={login.password}
              onChange={(e) => onValueChange(e)}
            />

            <Button className="bg-[#00373C]" onClick={() => loginUser()}>
              Login
            </Button>

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
        <div className="w-[400px] m-auto shadow-md shadow-black min-w-[300px] sm:min-w-[400px] lg:min-w-[500px]">
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
              onChange={(e) => onInputchange(e)}
              name="name"
            />
            <Input
              label="Enter username"
              className="text-gray-800 focus:border-[#00373C]"
              onChange={(e) => onInputchange(e)}
              name="username"
            />
            <Input
              label="Enter  password"
              className="text-gray-800 focus:border-[#00373C] "
              onChange={(e) => onInputchange(e)}
              name="password"
            />

            <Button onClick={() => signUpUser()} className="bg-[#00373C]">
              Sign Up
            </Button>

            <p className="text-center">Or</p>

            <Button
              onClick={() => handleAccount()}
              className="bg-blue-50 hover:bg-[#C8A25F] text-black "
            >
              Already have an account
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
