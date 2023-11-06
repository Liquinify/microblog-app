import React from "react";
import PostForm from "@/components/post/PostForm";
import PostList from "@/components/post/PostList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: userData } = await supabase.auth.getUser();

  return (
    <>
      <PostForm userData={userData} />
      <PostList userData={userData} />
    </>
  );
};

export default page;
