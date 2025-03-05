import { createContext, useState } from "react";
import { getWatchList } from "../utils/api";

//Initial context variable
export const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    uid: "",
    email: "",
    name: "",
  },
  appLoading: true,
  fetchWatchList: () => {},
});

//Tell which children will inherit the above
export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      uid: "",
      email: "",
      name: "",
    },
  });
  const [appLoading, setAppLoading] = useState(true);

  // Function to fetch and store watchlist in localStorage
  const fetchWatchList = async () => {
    try {
      const data = await getWatchList();
      const fetchedWatchList = data.watchList || [];

      const favorites = Object.fromEntries(
        fetchedWatchList.map((symbol) => [symbol, true])
      );
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("Error fetching watch list:", err);
    }
  };
  // ...
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, appLoading, setAppLoading, fetchWatchList }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
