import React from "react";

export default function BlueButton({ text }) {
  return (
    <React.Fragment>
      <div className="relative" style={{zIndex:"1"}}>
        <div className="bg-blue-theme lg:w-2/3 h-8 absolute rounded-md blur opacity-25 w-full"></div>
        <button className="bg-blue-theme lg:w-2/3 flex items-center justify-center h-8 rounded-md w-full relative text-sm">
          {text}
        </button>
      </div>
    </React.Fragment>
  );
}
