import React from "react";

export default function Padding({ children }) {
  return (
    <React.Fragment>
      <div className="lg:px-10 py-10">{children}</div>
    </React.Fragment>
  );
}
