import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

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

  const CHANGE_PROFILE = async (updatedProfile) => {
    try {
      if (!currentUser) {
        console.error("User not authenticated. Unable to change profile.");
        return;
      }

      const response = await axios.put(
        "http://localhost:8080/account/changeProfile",
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      const updatedProfileData = response.data;
      localStorage.setItem("user", JSON.stringify(updatedProfileData));
      console.log(updatedProfileData);
      setCurrentUser(JSON.parse(updatedProfileData));
    } catch (error) {
      console.log("Error changing profile:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        signUp,
        signIn,
        signOut,
        userContextLoading,
        CHANGE_PROFILE,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
