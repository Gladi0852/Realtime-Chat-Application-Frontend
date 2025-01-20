import React from "react";
import Usertemplate from "./Usertemplate";

function Users({ isMenuOpen, userData, onUserClick }) {
  return (
    <div
      className={`h-full bg-[#111B21] ${
        isMenuOpen ? "w-2/5 md:w-1/4" : "w-0"
      } transition-all duration-1000`}
    >
      <div className="p-5 h-full">
        <h1 className="text-white text-xl font-bold">Chats</h1>
        <div
          style={{
            height: "95%",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #111",
          }}
        >
          {userData.map((user, index) => (
            <Usertemplate data={user} key={index} onUserClick={onUserClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
