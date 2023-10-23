import Profile from "@/components/Profile";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { userData },
  } = await supabase.auth.getUser();

  return <Profile userData={userData} />;
};

export default page;
