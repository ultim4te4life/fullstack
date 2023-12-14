import React from "react";
import "./Home.css";
import { Header } from "../../components";
import { useUserContext } from "../../context/UserContext";

export const Home = () => {
  const { currentUser, logout } = useUserContext();
  console.log(currentUser);

  return (
    <div>
      <Header />

      <div>
        This is home page
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};
