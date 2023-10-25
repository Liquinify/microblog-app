import React, { FC } from "react";
import { Box, Card } from "@mui/material";
import Link from "next/link";
import SignOut from "./SignOut";

type Props = {
  dropdown: boolean;
};

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
  background: "#26272b",
};

const Dropdown: FC<Props> = ({ dropdown }) => {
  return (
    <>
      {dropdown && (
        <Box component="div">
          <Card component="div" sx={dropdownStyles}>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "1rem",
              }}
              href="/profile"
            >
              Profile
            </Link>
            <SignOut />
          </Card>
        </Box>
      )}
    </>
  );
};

export default Dropdown;
