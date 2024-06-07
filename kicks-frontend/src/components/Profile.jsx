
import { useState } from "react";
import Section from "./Section";


import UpdateData from "./UpdateData";
import { Orders } from "./Orders";

const Profile = () => {
  const [orderSelected , setOrderSelected] = useState(false)

  return (
    <Section>
      
      <div className="container flex ">
        
        <div className="flex justify-start items-start flex-col ">
          <h1 className=" -ml-14 mb-3 mr-10 px-4 w-[10rem] py-2 cursor-pointer  hover:bg-slate-50 pr-2 rounded-md" onClick={()=>setOrderSelected(false)}>
            My Profile
          </h1>
          <h1 className="-ml-14 mb-3 mr-10 px-4 w-[10rem] py-2  cursor-pointer  hover:bg-slate-50 pr-2 rounded-md" onClick={()=>setOrderSelected(true)}>
            Orders
          </h1>
        </div>
        <div className=" h-auto min-h-[1em] w-0.5 self-stretch bg-n-2/40  dark:bg-white/10" />
        {orderSelected ? <Orders/>:<UpdateData/>}
        
      </div>
    </Section>
  );
};

export default Profile;
