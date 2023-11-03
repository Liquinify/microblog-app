"use client";

import { Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const signOutStyles = {
  display: "flex",
  justifyContent: "flex-start",
  color: "black",
  fontSize: "1rem",
  paddingTop: ".6rem",
  cursor: "pointer",
};

export default function SignOut() {
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <Typography style={signOutStyles} onClick={handleSignOut}>
      Sign Out
    </Typography>
  );
}
