import React from "react";
import { Box, Card } from "@mui/material";
import SignOut from "../auth/SignOut";

const dropdownStyles = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
  width: "9rem",
  height: "10rem",
  position: "absolute",
  left: "91.5%",
  top: "90%",
  pl: 2,
  pt: 2,
  background: "#f5fffa",
  color: "black",
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
