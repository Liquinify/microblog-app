import PostForm from "@/components/post/PostForm";
import PostList from "@/components/post/PostList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <PostForm data={data} />
      <PostList data={data} />
    </div>
  );
};

export default page;
