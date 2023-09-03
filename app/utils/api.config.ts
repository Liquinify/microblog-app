import { supabase } from "./supabaseClient";

export const fetchPosts = async () => {
  const { data } = await supabase.from("Posts").select();
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

export const fetchComments = async () => {
  const { data } = await supabase.from("Posts").select("comments");
  return data;
};
