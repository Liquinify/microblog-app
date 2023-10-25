"use client";

import React, { useRef, useState, useEffect } from "react";
import { AppBar, Box, Card, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import SignOut from "./SignOut";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";

const buttonStyles = {
  textDecoration: "none",
  color: "white",
};

const Navbar = ({ data }) => {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const ref = useRef();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{ background: "#26272b", opacity: ".95", width: "100%" }}
    >
      <Toolbar sx={{ position: "relative" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            href="/posts"
          >
            Microblogging
          </Link>
        </Typography>
        {!data ? (
          <Box
            component="div"
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <Button onClick={() => router.push("/sign-in")} sx={buttonStyles}>
              Log in
            </Button>
            <Button
              onClick={() => router.push("/sign-up")}
              variant="contained"
              sx={buttonStyles}
            >
              SIGN UP
            </Button>
          </Box>
        ) : (
          <Box
            component="div"
            ref={ref}
            sx={{
              display: "flex",
              cursor: "pointer",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            <Box
              component="img"
              src={data.user_metadata.avatar}
              sx={{ width: "1.7rem", borderRadius: "50%" }}
            />
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              {data.user_metadata.username}
            </Typography>
            <ArrowDropDownIcon
              onClick={() => setDropdown(!dropdown)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        )}
        <Dropdown dropdown={dropdown} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
