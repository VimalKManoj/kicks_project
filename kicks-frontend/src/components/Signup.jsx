import React, { useEffect, useState } from "react";
import Section from "./Section";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { setLoggedIn, userDetails } from "../Redux/userSlice";
import { useDispatch } from "react-redux";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
 
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        { ...formData },
        {
          withCredentials: true,
        }
      );
      dispatch(userDetails(newUser.data));
      dispatch(setLoggedIn(true));
      navigate("/");
      
    } catch (error) {
      console.log(error);
      setError(error?.response.data.error.message);
    } finally {
      setIsLoading(false);
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

          <Button
            className="bg-black h-14 mt-10 mb-5 flex justify-center items-center"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress
                  sx={{ height: "5px", width: "5px", color: "white" }}
                />
              </Box>
            ) : (
              " Sign Up"
            )}
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
