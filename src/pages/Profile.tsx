import React, { useState } from "react";
import { db, auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
}

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name, email } = formData as UserData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <section
        className="max-w-6xl mx-auto flex
      justify-center items-center flex-col"
      >
        <h1
          className="text-3xl text-center
        mt-6 font-bold"
        >
          My Profile
        </h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* name input */}
            <input
              className="w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded
              transition duration-300 ease-in-out mb-6"
              type="text"
              id="name"
              value={name}
              disabled
            />
            {/* Email Input */}
            <input
              className="w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded
              transition duration-300 ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
              disabled
            />
            <div
              className="flex justify-between whitespace-nowrap
            text-sm sm:text-lg mb-6"
            >
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  className="text-red-600 
                hover:text-red-700 transition duration-200
                ease-in-out ml-1 cursor-pointer"
                >
                  Edit
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800
              transition duration-200 ease-in-out cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
