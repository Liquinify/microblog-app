import { supabase } from "@/lib/client";

export const getComments = async () => {
  const { data } = await supabase.from("comments").select();

  return data;
};
