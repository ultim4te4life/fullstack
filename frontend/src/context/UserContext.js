import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [userContextLoading, setUserContextLoading] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setUserContextLoading(false);
        return;
      }
      setCurrentUser(user);
      setUserContextLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const signUp = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signIn = (userInfo) => {
    setCurrentUser(userInfo);
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, signUp, signIn, signOut, userContextLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
