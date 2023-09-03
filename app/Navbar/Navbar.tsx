"use client";

import { supabase } from "@/app/utils/supabaseClient";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "../hooks/currentUser";

const Navbar = () => {
  const { currentUser, handleRefreshCurrentUser, data } = useCurrentUser();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    handleRefreshCurrentUser();
  }, [data]);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Microblog</Link>
          </Typography>
          {currentUser?.role === "authenticated" ? (
            ""
          ) : (
            <Button color="inherit">
              <Link href="/signup">Sign Up </Link>
            </Button>
          )}
          {currentUser?.role === "authenticated" ? (
            <Button color="inherit" onClick={handleLogout}>
              <Link href="#">Sign Out </Link>
            </Button>
          ) : (
            <Button color="inherit">
              <Link href="/signin">Sign In </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
