// EditProfileModal.js

import React, { useState, useEffect } from "react";
import { Modal } from "../../components";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useUserContext } from "../../context/UserContext";

const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  age: Yup.number().required("Age is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  newPassword: Yup.string().required("New password is required"),
  password: Yup.string().required("Old password is required"), // Add oldPassword validation
});

export const EditProfileModal = ({ open, onClose }) => {
  const { currentUser, CHANGE_PROFILE } = useUserContext();

  const [editedProfile, setEditedProfile] = useState({
    firstname: currentUser.user ? currentUser.user.firstname : "",
    lastname: currentUser.user ? currentUser.user.lastname : "",
    age: currentUser.user ? currentUser.user.age : "",
    email: currentUser.user ? currentUser.user.email : "",
    newEmail: currentUser.user ? currentUser.user.email : "",
    newPassword: "",
    password: "", // Add oldPassword field
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    newPassword: "",
    password: "", // Add oldPassword field
  });

  const handleInputChange = (field, value) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };
  const handleEditProfile = async () => {
    try {
      await validationSchema.validate(editedProfile, { abortEarly: false });

      // Call your API function for updating the profile
      const updatedProfile = await CHANGE_PROFILE(editedProfile);

      //   localStorage.setItem("user", JSON.stringify(updatedProfile));
      console.log(updatedProfile);
      onClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((validationError) => {
          const path = validationError.path || "unknown";
          newErrors[path] = validationError.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error during profile update:", error);
      }
    }
  };

  const handleCancel = () => {
    onClose(); // Call the onClose function to close the modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <Typography variant="h6">Edit Profile</Typography>
        <form>
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={editedProfile.firstname}
            onChange={(e) => handleInputChange("firstname", e.target.value)}
            error={!!errors.firstname}
            helperText={errors.firstname}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={editedProfile.lastname}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
            error={!!errors.lastname}
            helperText={errors.lastname}
          />
          <TextField
            label="Age"
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            value={editedProfile.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={editedProfile.newEmail}
            onChange={(e) => handleInputChange("newEmail", e.target.value)}
            error={!!errors.newEmail}
            helperText={errors.newEmail}
          />
          <TextField
            label="New Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={editedProfile.newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />
          <TextField
            label="Old password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            value={editedProfile.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
            sx={{ marginTop: 2 }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel} // Use handleCancel to close the modal
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
