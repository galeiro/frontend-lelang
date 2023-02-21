import React from "react";

export default function Title({ text }) {
  return (
    <React.Fragment>
      <h1 className="lg:text-3xl text-xl font-semibold break-words">{text}</h1>
    </React.Fragment>
  );
}
