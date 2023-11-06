"use client";

import { Box, Typography, Container, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        width: "100%",
        position: "fixed",
        bottom: 0,
        height: "5rem",
        boxShadow: "0px -5px 5px 0px #888888",
      }}
      component="footer"
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{ fontSize: 20, textAlign: "center", mt: 4 }}
        >
          <Link href="https://github.com/Liquinify">Github</Link>
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
