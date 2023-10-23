import Profile from "@/components/Profile";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getUser();

  return <Profile data={data} />;
};

export default page;
