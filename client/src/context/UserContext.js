import { createContext, useState } from "react";
import { userAuth } from "../services/dataObj";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [dataAuth, setDataAuth] = useState({
    auth: userAuth(),
  });

  const setUser = (user) => {
    setDataAuth(user);
  };

  const context = {
    dataAuth,
    setDataAuth,
    setUser,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
