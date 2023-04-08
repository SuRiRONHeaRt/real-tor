import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <button
      className="flex items-center justify-center
    w-full bg-red-700 text-white px-7 py-3 touch-pan-up
    text-sm font-medium hover:bg-red-800 
    active:bg-red-900 shadow-md hover:shadow-lg
    active:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2
    transition duration-150 ease-in-out rounded"
    >
      <FcGoogle
        className="taxt-2xl bg-white rounded-full
      mr-2"
      />
      Continue with Google
    </button>
  );
};

export default OAuth;
