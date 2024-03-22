import React, { useEffect, useState } from "react";
import Section from "./Section";
import Button from "./Button";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        { ...formData }
      );
    } catch (error) {
      setError(error.response.data.error.message);
    }
  };

  return (
    <Section className=" h-screen">
      <div className="container justify-around items-center flex flex-col ">
        <div className=" flex  justify-center items-center  h2">
          Create Account
        </div>
        <form className="flex justify-center  flex-col mt-10  ">
          <input
            onChange={handleOnChange}
            type="text"
            placeholder="Name"
            required
            id="name"
            className="h-14 w-[26rem] mb-3 pl-3 border rounded-md"
          />
          <input
            type="email"
            onChange={handleOnChange}
            placeholder="Email"
            required
            id="email"
            className="h-14 w-[26rem] mb-3 pl-3 border rounded-md"
          />
          <input
            type="password"
            onChange={handleOnChange}
            placeholder="Password"
            required
            min={8}
            id="password"
            className="h-14 w-[26rem] mb-3 pl-3 border rounded-md"
          />
          <input
            type="password"
            onChange={handleOnChange}
            placeholder="Confirm Password"
            required
            min={8}
            id="confirmPassword"
            className="h-14 w-[26rem] mb-3 pl-3 border rounded-md"
          />
          {error ? <h5 className=" mb-3 text-red-600">{error}</h5> : <></>}

          <Button className="bg-black h-14 mt-10 mb-5" onClick={handleSubmit}>
            Sign Up
          </Button>
        </form>
        <h4 className="w-[26rem] flex justify-items-start">
          Already have an account?{" "}
          <Link to="/login" className=" text-color-1  ml-2">
            Login
          </Link>
        </h4>
      </div>
    </Section>
  );
};

export default Signup;
