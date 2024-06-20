import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";


const items = (setLink ,baseURL) =>[
    {
      key: '1',
      label: (
        <div onClick={()=>{setLink(`${baseURL}api/v1/products?sort=-price`)}}>
         Price : High to Low
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={()=>{setLink(`${baseURL}api/v1/products?sort=price`)}}>
          Price : Low to High
        </div>
      ),
    },
  ];

const SortByDrop = ({setLink ,baseURL}) => {
  return (
    <Space direction="vertical">
    <Space wrap>
      <Dropdown
        menu={{
          items :items(setLink ,baseURL),
        }}
        placement="bottom"
      >
        <div>SortBy
        <KeyboardArrowDownSharpIcon />
        </div>
      </Dropdown>
    </Space>
    
  </Space>
  )
}

export default SortByDrop



