import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import SignOut from "./SignOut";

const Navbar = () => {
  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              href="/posts"
            >
              Home
            </Link>
          </Typography>
          <SignOut />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
