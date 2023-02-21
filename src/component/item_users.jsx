import { Avatar } from "@mui/material";
import { TrashIcon } from "@heroicons/react/outline";
import React from "react";

export default function ItemUser({ img, name, username, email, id }) {
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: { bgColor: stringToColor(name) },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <React.Fragment>
      <div className="flex space-x-5 items-center justify-between">
        <div className="flex space-x-5 items-center">
          <Avatar src={img} />
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-sm ">{email}</p>
          <p className="text-sm ">{username}</p>
        </div>
        <button className="hover:bg-navbar rounded-full px-2 py-2">
          <TrashIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </React.Fragment>
  );
}
