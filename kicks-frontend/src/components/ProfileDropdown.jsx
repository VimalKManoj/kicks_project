import React from "react";
import { Button, Dropdown, Space } from "antd";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn , userDetails } from "../Redux/userSlice";
import PersonIcon from '@mui/icons-material/Person';

const ProfileDropdown = ({baseURL}) => {
  const {currentUser }  = useSelector((state)=>state.user)

  const dispatch = useDispatch();
 
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${baseURL}api/v1/users/logout`, {
        withCredentials: true,
      });
      dispatch(setLoggedIn(false));
      
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to="/profile" className="px-8">
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/orders" className="px-8">
          My Orders
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <div className="px-8" onClick={logoutUser}>
          Logout
        </div>
      ),
    },
  ];
  return (
    <Space direction="vertical" className="hidden lg:flex">
      <Space wrap>
        <Dropdown
        
          menu={{
            items,
          }}
          placement="bottom"
        >
         <Link
                  className="hidden lg:flex relative font-code text-2xl uppercase  text-n-8 transition-colors hover:text-color-1  px-2 py-0 md:py- lg:-mr-0.25 lg:text-sm lg:font-semibold cursor-pointer lg:leading-5 lg:hover-text-n-1 "
                 
                >
                  <div className=" w-10 h-10 flex justify-center items-center rounded shadow-md ">
                    <PersonIcon />
                  </div>
                </Link>
         
        </Dropdown>
      </Space>
    </Space>
  );
};

export default ProfileDropdown;
