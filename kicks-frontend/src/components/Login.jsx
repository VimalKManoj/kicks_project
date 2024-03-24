import React, { useState } from "react";
import Section from "./Section";
import Button from "./Button";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await axios.post(
        "http://localhost:3000/api/v1/users/signin",
        { ...formData },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
      setError(error?.response.data.error.message);
    }
  };

  return (
    <Section className=" h-screen">
      <div className="container justify-around items-center flex flex-col h-4/6">
        <div className=" flex  justify-center items-center mb-4 h2  ">
          Log in to your account
        </div>
        <form className="flex justify-center  flex-col">
          <input
            type="text"
            placeholder="Email"
            onChange={handleOnChange}
            id="email"
            className="h-14 w-[26rem] mb-3 pl-3 border rounded-md"
          />
          <input
            type="password"
            id="password"
            onChange={handleOnChange}
            placeholder="Password"
            className="h-14 w-[26rem] mb-3 pl-3 border rounded-md"
          />
          {error ? <h5 className=" mb-3 text-red-600">{error}</h5> : <></>}

          <Button className="bg-black h-14 mt-10 mb-5" onClick={handleSubmit}>
            Login
          </Button>
        </form>
        <h4 className="w-[26rem] flex justify-items-start">
          Don't have an account?{" "}
          <Link to="/signup" className="text-color-1 ml-2">
            {" "}
            Sign up
          </Link>
        </h4>
      </div>
    </Section>
  );
};

export default Login;
