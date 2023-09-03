import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { supabase } from "../utils/supabaseClient";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("Posts").select();

    if (error) {
      console.log(error);
    }

    if (data) {
      setPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <PostForm />
      {posts.map((post, idx: number) => (
        <PostItem post={post} key={idx} />
      ))}
    </div>
  );
};

export default PostList;
