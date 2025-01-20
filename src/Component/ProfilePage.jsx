import React from "react";
import defaultImage from "../assets/default_image.jpg";
import { motion } from "framer-motion";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function ProfilePage({ selfInfo }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className={`h-full w-2/4 md:w-1/4 bg-[#111B21]`}>
      <div className="p-5 flex flex-col items-center">
        <h1 className="text-white text-xl font-bold">Profile</h1>
        <div className="rounded-full w-3/4 aspect-square overflow-hidden my-10">
          <img src={defaultImage} alt="" />
        </div>
        <h1 className="text-2xl mb-5 text-white">
          {selfInfo.first_name} {selfInfo.last_name}
        </h1>
        <h1 className="text-xl text-white mb-20 font-light">
          {selfInfo.username}
        </h1>

        <motion.button
          whileHover={{ scale: 0.9 }}
          className="text-red-500 border flex gap-x-5 items-center border-red-500 px-4 py-2 rounded-xl"
          onClick={handleLogout}
        >
          <CiLogout />
          <p>Log out</p>
        </motion.button>
      </div>
    </div>
  );
}

export default ProfilePage;
