"use client";

import { Button } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignOut() {
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <Button
      sx={{ display: "flex", justifyContent: "flex-start" }}
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
