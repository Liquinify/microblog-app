import React from "react";
import { Box, Card } from "@mui/material";
import SignOut from "../auth/SignOut";

const dropdownStyles = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  width: "9rem", // Adjust the width as needed for your content
  height: "10rem",
  mt: 1,
  position: "absolute",
  right: "0",
  top: "100%",
  pl: 2,
  pt: 2,
  background: "#f5fffa",
  color: "black",
  zIndex: 1,
};

const Dropdown = ({ dropdown }: { dropdown: boolean }) => {
  return (
    <>
      {dropdown && (
        <Box component="div">
          <Card component="div" sx={dropdownStyles}>
            <SignOut />
          </Card>
        </Box>
      )}
    </>
  );
};

export default Dropdown;
