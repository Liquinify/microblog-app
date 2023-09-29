import Navbar from "@/components/Navbar";
import PostForm from "@/components/Post/PostForm";
import PostList from "@/components/Post/PostList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const { data: userSession } = await supabase.auth.getSession();

  if (!userSession.session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <Navbar />
      <PostForm data={data} />
      <PostList data={data} />
    </div>
  );
};

export default page;
