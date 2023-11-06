"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { SubmitHandler, FieldValues } from "react-hook-form";

const UpdatePassword = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit } = useForm();

  const updatePassword: SubmitHandler<FieldValues> = async (formData) => {
    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.replace("/");
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "33rem",
        height: "25rem",
        position: "absolute",
        top: "20%",
        left: "33%",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(updatePassword)}
        sx={{ display: "flex", gap: 5, flexDirection: "column" }}
      >
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Update Password
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Your password"
          autoComplete="password"
          autoFocus
          {...register("password")}
        />
        <Button type="submit" variant="contained" fullWidth>
          Update Password
        </Button>
      </Box>
      {errorMsg && <Typography sx={{ color: "red" }}>{errorMsg}</Typography>}
    </Paper>
  );
};

export default UpdatePassword;
