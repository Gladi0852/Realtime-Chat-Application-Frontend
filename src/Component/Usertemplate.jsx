import React from "react";
import defaultImage from "../assets/default_image.jpg";

function Usertemplate({ data, onUserClick }) {
  const handleClick = () => {
    if (onUserClick) {
      onUserClick(data); // Pass `data.username` back to the parent component
    }
  };
  return (
    <div
      className="flex gap-x-6 items-center py-6 border-b-[1px] border-[#222E35] cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-10 aspect-square rounded-full overflow-hidden">
        <img src={defaultImage} alt="" />
      </div>
      <h2 className="text-white text-sm lg:text-lg">
        {data.first_name} {data.last_name}
      </h2>
    </div>
  );
}

export default Usertemplate;
