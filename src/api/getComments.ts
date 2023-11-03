import { supabase } from "@/lib/client";

export const getComments = async () => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(*)");

  if (error) {
    console.log(error);
  }

  return data as CommentsWithUser[];
};
