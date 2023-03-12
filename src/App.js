import React, { useState } from "react";
import { createContext } from "react";
import { Flat } from "./components/Flat";
import { Studio } from "./components/Studio";
import { Switcher } from "./components/Switcher";

export const appContext = createContext(null);

const rootElement = document.getElementById("root");
const initialCost = {
  hour: rootElement.getAttribute("hour"),
  day: rootElement.getAttribute("day"),
};

const App = () => {
  let [visible, setVisible] = useState({
    flat: { display: "none" },
    studio: { display: "none" },
  });

  return (
    <appContext.Provider
      value={{
        setVisible,
        visible,
        flat: {},
        studio: {},
        initialCost: initialCost || {},
      }}
    >
      <div className="container d-flex justify-content-center flex-column">
        <Switcher />
        <Flat />
        <Studio />
      </div>
    </appContext.Provider>
  );
};

export default App;
