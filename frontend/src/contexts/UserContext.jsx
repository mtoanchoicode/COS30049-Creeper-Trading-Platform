import React, { createContext, useContext } from "react";
import data from "../data/user.json";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={{ userData: data }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useUser = () => {
  return useContext(UserContext);
};
