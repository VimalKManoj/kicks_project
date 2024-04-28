import React, { useEffect, useState } from "react";
import Section from "./Section";
import axios from "axios";
import Button from "./Button";
import { useSelector } from "react-redux";

const Profile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get(
          "http://localhost:3000/api/v1/users/profile",
          {
            withCredentials: true,
          }
        );
        setUser(user.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);
  console.log(user)
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
        <div className="flex flex-col flex-1 ml-12">
          <div className="flex flex-1 p-3 font-semibold text-xl">
            Your Account Settings
          </div>

          <div className=" top-1/2 left-1/2 w-full  border border-n-2/40  mb-10" />

          <form>
            <div className="flex flex-row flex-grow">
              <div className="flex flex-col w-full">
                <div class="mb-5">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={user ? user.name : ""}
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
                    disabled
                    value={user ? user.email : ""}
                    class="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg w-3/4 p-2.5 cursor-not-allowed"
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
                    value={user ? user.address : ""}
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
                    value={user ? user.city : ""}
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
                    value={user ? user.country : ""}
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
                    value={user ? user.mobile : ""}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-3/4 p-2.5"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className=" flex flex-col justify-center items-center flex-grow w-1/2 h-full mr-10">
                <img
                  class="w-60 h-60 rounded-2xl "
                  src={`users/${user&& user.photo}`}
                  alt=""
                  width="384"
                  height="512"
                />
                <input
                  type="file"
                  id="photo"
                  className=" w-[.1rem] h-[.1rem] opacity-0 overflow-hidden absolute -z-1"
                  accept="image/*"
                  name="photo"
                  required
                />
                <label
                  for="photo"
                  class="text-center text-white text-sm rounded-lg p-2.5 cursor-pointer mt-10 w-60  border-2 border-black hover:border-color-1  bg-black hover:bg-white hover:text-color-7"
                >
                  Choose new photo
                </label>
              </div>
            </div>
            <Button className=" border-black hover:border-color-1  bg-black mt-10">
              Save changes
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Profile;
