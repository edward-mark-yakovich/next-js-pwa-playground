import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);

  return (
    <AppContext.Provider
      value={{
        devices,
        setDevices
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
