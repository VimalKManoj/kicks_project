import React from "react";
import { Button, Dropdown, Space } from "antd";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedIn , userDetails } from "../Redux/userSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users/logout", {
        withCredentials: true,
      });
      dispatch(setLoggedIn(false));
      console.log(res);
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
          <Avatar
            variant="rounded"
            src=""
            sx={{ boxShadow: "2" }}
            className=" cursor-pointer"
          />
        </Dropdown>
      </Space>
    </Space>
  );
};

export default ProfileDropdown;
