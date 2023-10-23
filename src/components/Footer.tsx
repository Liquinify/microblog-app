"use client";

import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "blue",
        py: 6,
        width: "100%",
        position: "absolute",
        top: "85%",
        minHeight: "15%",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", fontSize: 40 }}>
        <Link href="https://github.com/Liquinify">Github</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
