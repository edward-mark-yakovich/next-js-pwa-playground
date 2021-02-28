import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [postCurrentPage, setPostCurrentPage] = useState(1);

  return (
    <AppContext.Provider
      value={{
        devices,
        setDevices,
        postCurrentPage,
        setPostCurrentPage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
