import { supabase } from "@/lib/client";

export const getPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, profiles(*), likes(user_id)`);

  if (error) {
    console.log(error);
  }

  return data;
};
