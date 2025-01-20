import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

function SideNavbar({
  isMenuOpen,
  setIsMenuOpen,
  isProfileOpen,
  setIsProfileOpen,
}) {
  return (
    <div className="h-full w-16 bg-[#202C33] flex flex-col justify-between items-center p-6">
      <div
        className={`w-fit h-fit rounded-full p-3 ${
          (isMenuOpen && !isProfileOpen) ? "bg-[#374248]" : "bg-transparent"
        } cursor-pointer`}
        onClick={() => {
          if (isProfileOpen) {
            setIsMenuOpen(true);
          } else {
            setIsMenuOpen(!isMenuOpen);
          }

          setIsProfileOpen(false);
        }}
      >
        <IoChatbubbleEllipsesOutline className="text-2xl text-white" />
      </div>

      <div
        className={`w-fit h-fit rounded-full cursor-pointer p-3 ${isProfileOpen?"bg-[#374248]" : "bg-transparent"}`}
        onClick={() => setIsProfileOpen(true)}
      >
        <FaUser className="text-2xl text-white" />
      </div>
    </div>
  );
}

export default SideNavbar;
