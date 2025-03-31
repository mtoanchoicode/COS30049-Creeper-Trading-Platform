import { createContext, useState } from "react";

export const NFTContext = createContext(); // Explicitly export NFTContext

export const NFTProvider = ({ children }) => {
  const [nfts, setNfts] = useState([]);

  return (
    <NFTContext.Provider value={{ nfts, setNfts }}>
      {children}
    </NFTContext.Provider>
  );
};


