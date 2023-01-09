import React from "react";

const DemoOutput = (props) => {
  console.log("DemoOutput running");
  return <p>{props.children}</p>;
};

export default DemoOutput;
