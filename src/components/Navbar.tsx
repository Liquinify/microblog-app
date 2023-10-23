"use client";

import { AppBar, Box, Card, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import SignOut from "./SignOut";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar = ({ data }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/posts"
            >
              Microblogging
            </Link>
          </Typography>
          {!data ? (
            <Box component="div">
              <Link href="/sign-up">Sign Up</Link>
              <Link href="/sign-in">Sign In</Link>
            </Box>
          ) : (
            <Box
              component="div"
              sx={{
                display: "flex",
                cursor: "pointer",
                gap: 1,
                justifyContent: "flex-end",
              }}
              onClick={() => setDropdown(!dropdown)}
            >
              <Box
                component="img"
                src={data.user_metadata.avatar}
                sx={{ width: "2%", borderRadius: "50%" }}
              />
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                {data.user_metadata.username}
              </Typography>
              <ArrowDropDownIcon />
            </Box>
          )}
          {dropdown && (
            <Card
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                width: "8% ",
                height: "10rem",
                position: "absolute",
                left: "90%",
                top: "100%",
                pl: 2,
                pt: 2,
              }}
            >
              <Link href="/profile">Profile</Link>
              <SignOut />
            </Card>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
