import React from "react";
import Section from "./Section";

const Profile = () => {
  return (
    <Section>
      <div className="container flex ">
        <div className="flex justify-start items-start flex-col ">
          <h1 className=" -ml-14 mb-3 mr-10 px-4 w-[10rem] py-2 cursor-pointer  hover:bg-slate-50 pr-2 rounded-md">
            My Profile
          </h1>
          <h1 className="-ml-14 mb-3 mr-10 px-4 w-[10rem] py-2  cursor-pointer  hover:bg-slate-50 pr-2 rounded-md">
            Orders
          </h1>
        </div>
        <div className=" h-auto min-h-[1em] w-0.5 self-stretch bg-n-2/40  dark:bg-white/10" />
        <div className="flex flex-col flex-1 ml-3">
          <div className="flex flex-1 p-3 font-semibold text-xl">
            My Profile
          </div>
         
          <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-10" />
          <div className="flex flex-row w-full">
          <form className=" flex-grow">
            <div class="mb-5">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-3/4 p-2.5"
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-3/4 p-2.5"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-3/4 p-2.5"
                placeholder="123 Main Street, Anytown"
                required
              />
            </div>
            
            <div class="mb-5">
              <label
                for="city"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-3/4 p-2.5"
                placeholder=""
                required
              />
            </div>

            <div class="mb-5">
              <label
                for="country"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-3/4 p-2.5"
                placeholder=""
                required
              />
            </div>
            <div class="mb-5">
              <label
                for="mobile"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile No
              </label>
              <input
                type="text"
                id="mobile"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-3/4 p-2.5"
                placeholder=""
                required
              />
            </div>
            
          </form>
          <div className=" flex-grow">Hai</div>
          </div>
          
        </div>
      </div>
    </Section>
  );
};

export default Profile;
