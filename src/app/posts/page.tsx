import PostForm from "@/components/post/PostForm";
import PostList from "@/components/post/PostList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: userData } = await supabase.auth.getUser();

  return (
    <>
      <PostForm userData={userData} />
      <PostList userData={userData} />
    </>
  );
};

export default page;
