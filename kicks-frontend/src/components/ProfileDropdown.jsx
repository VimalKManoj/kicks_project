import React from "react";
import { Button, Dropdown, Space } from "antd";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
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
      <Link to="/" className="px-8">
        Logout
      </Link>
    ),
  },
];
const ProfileDropdown = () => (
  <Space direction="vertical">
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

export default ProfileDropdown;
