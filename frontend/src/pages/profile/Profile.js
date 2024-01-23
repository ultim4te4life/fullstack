// Profile.js

import React, { useState } from "react";
import "./Profile.css";
import { useUserContext } from "../../context/UserContext";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components";
import { EditProfileModal } from "./EditProfileModal";

export const Profile = () => {
  const { currentUser } = useUserContext();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  console.log("currentUser:", currentUser);
  console.log("currentUser.user:", currentUser.user);

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <h1 className="profile-heading">Welcome to Your Profile</h1>
        <div className="profile-info">
          <div className="profile-image">
            <img
              src={
                currentUser && currentUser.user
                  ? currentUser.user.profileImage
                  : "default-image.jpg"
              }
              alt="Profile"
            />
          </div>
          <div className="profile-details">
            <p className="profile-welcome">
              Welcome,{" "}
              {currentUser && currentUser.user
                ? currentUser.user.name
                : "Guest"}
              !
            </p>
            <p className="profile-email">
              Email:{" "}
              {currentUser && currentUser.user ? currentUser.user.email : ""}
            </p>
            <p className="profile-email">
              First Name:{" "}
              {currentUser && currentUser.user
                ? currentUser.user.firstname
                : ""}
            </p>
            <p className="profile-email">
              Last Name:{" "}
              {currentUser && currentUser.user ? currentUser.user.lastname : ""}
            </p>
            <p className="profile-email">
              Age: {currentUser && currentUser.user ? currentUser.user.age : ""}
            </p>
            <button onClick={openModal}>Edit Profile</button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal open={isModalOpen} onClose={closeModal} />
      )}

      <Footer />
    </div>
  );
};
