import React, { useState } from "react";
import { Button } from "./ui/button";

const TabButtons = () => {
  // State variable for at holde styr på, om knapperne er toggled eller ej.
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled); // Skifter tilstanden
  };

  return (
    <div className="tab-buttons-container">
      <Button onClick={() => console.log("Handling for Add")}>Add</Button>
      {isToggled ? (
        <>
          <Button onClick={() => console.log("Handling for Save")}>Save</Button>
          <Button onClick={() => console.log("Handling for Cancel")}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => console.log("Handling for Remove")}>
            Find
          </Button>
          <Button onClick={() => console.log("Handling for Edit")}>Edit</Button>
          <Button onClick={() => console.log("Handling for Remove")}>
            Remove
          </Button>
        </>
      )}
      <Button onClick={handleToggle}>
        {isToggled ? "Edit/Remove" : "Save/Cancel"}
      </Button>
    </div>
  );
};

export default TabButtons;
