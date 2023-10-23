import { supabase } from "@/lib/client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

export const getPosts = async () => {
  const { data } = await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false });

  return data;
};
