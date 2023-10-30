"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { SubmitHandler, FieldValues } from "react-hook-form";

const SignUp = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { register, handleSubmit } = useForm();

  const defaultAvatar =
    "https://lesuezlfeulhjswwbyks.supabase.co/storage/v1/object/public/avatars/User-avatar.svg.png";

  const signUp: SubmitHandler<FieldValues> = async (formData) => {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.username,
          avatar_url: defaultAvatar,
        },
      },
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg(
        "Success! Please check your email for further instructions."
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 30, ml: 75 }}>
      <CssBaseline />
      <Paper
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40rem",
          height: "30rem",
          paddingInline: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <Box component="form" onSubmit={handleSubmit(signUp)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            {...register("username")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          {errorMsg && (
            <Typography sx={{ color: "red", textAlign: "center" }}>
              {errorMsg}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="/reset-password">Forgot password?</Link>
            </Grid>
            {successMsg && <Typography>{successMsg}</Typography>}
            <Grid item>
              <Link href="/sign-up">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
