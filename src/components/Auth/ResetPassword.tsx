"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { register, handleSubmit } = useForm();

  async function resetPassword(formData) {
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        redirectTo: `${window.location.origin}/auth/update-password`,
      }
    );

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Password reset instructions sent.");
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 30, ml: 75 }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "35rem",
          height: "25rem",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(resetPassword)}
          sx={{
            display: "flex",
            gap: 5,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="h5">
            Forgot Password
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            {...register("email")}
          />
          <Button variant="contained" fullWidth type="submit">
            Send Instructions
          </Button>
          {errorMsg && <Typography>{errorMsg}</Typography>}
          {successMsg && <Typography>{successMsg}</Typography>}
          <Link href="/sign-in">Remember your password? Sign In.</Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
