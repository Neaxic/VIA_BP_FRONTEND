import React from "react";
import { Button } from "./ui/button";

const TabButtons = () => {
  return (
    <div className="tab-buttons-container">
      <Button onClick={() => console.log("Handling for knap 1")}>Add</Button>
      <Button onClick={() => console.log("Handling for knap 2")}>Edit</Button>
      <Button onClick={() => console.log("Handling for knap 3")}>Remove</Button>
    </div>
  );
};
export default TabButtons;
