"use client";

import React, { useRef, useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import { useQuery } from "react-query";
import { getUser } from "@/api/getUser";

const buttonStyles = {
  textDecoration: "none",
  color: "white",
};

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const ref = useRef();
  const { data: userData } = useQuery("user", getUser);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setDropdown(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);

    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{ background: "black", opacity: ".95", width: "100%" }}
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
        {!userData ? (
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
            {userData.map((user) => (
              <Box
                key={user.id}
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                component="div"
              >
                <Box component="div" sx={{ display: "flex", gap: 2 }}>
                  <Box
                    component="img"
                    src={user.avatar_url}
                    sx={{ width: "1.3rem", borderRadius: "50%" }}
                  />
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    {user.username}
                  </Typography>
                </Box>
                <ArrowDropDownIcon
                  onClick={() => setDropdown(!dropdown)}
                  sx={{ cursor: "pointer" }}
                />
              </Box>
            ))}
          </Box>
        )}
        <Dropdown dropdown={dropdown} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
