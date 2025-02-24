import { createContext, useState } from "react";

//Initial context variable
export const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    email: "",
    name: "",
  },
  appLoading: true,
});

//Tell which children will inherit the above
export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      email: "",
      name: "",
    },
  });
  const [appLoading, setAppLoading] = useState(true);
  // ...
  return (
    <AuthContext.Provider value={{ auth, setAuth, appLoading, setAppLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
