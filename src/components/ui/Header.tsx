"use client";

import React, { useRef, useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import { useUser } from "@/api/getUser";
import { Session, User } from "@supabase/supabase-js";

const buttonStyles = {
  textDecoration: "none",
  color: "black",
};

const Header = ({ session }: { session: Session | null }) => {
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const { data: userData } = useUser();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#f5fffa",
        opacity: ".95",
        width: "100%",
        height: "4rem",
      }}
    >
      <Toolbar sx={{ position: "relative" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            href="/posts"
          >
            Microblogging
          </Link>
        </Typography>
        {!session ? (
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
              sx={{ color: "white" }}
            >
              SIGN UP
            </Button>
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
          >
            {userData?.map((user) => (
              <Box
                key={user.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  color: "black",
                }}
                component="div"
                ref={ref}
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
                  onClick={() => setDropdown((drop) => !drop)}
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
