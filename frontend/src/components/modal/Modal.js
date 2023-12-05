import React from "react";
import { Box, Modal as MuiModal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Modal = (props) => {
  const { open, handleClose, children } = props;
  return (
    <div>
      <MuiModal open={open} onClose={handleClose}>
        <Box sx={style}>{children}</Box>
      </MuiModal>
    </div>
  );
};
