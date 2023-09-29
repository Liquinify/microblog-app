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

// const createPost = async (formData) => {
//   const { data } = await supabase.auth.getUser();
//   const { error } = await supabase.from("posts").insert({
//     post: formData.post,
//     username: data?.user.user_metadata.username,
//   });
// };

// export const useUpdatePosts = () => {
//   return useMutation((formData) => createPost(formData));
// };
