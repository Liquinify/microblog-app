"use client";

import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import CommentsList from "../comment/CommentList";
import { getComments } from "@/api/getComments";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation, useQuery, useQueryClient } from "react-query";

const PostItem = ({ post }: { post: PostsWithUser }) => {
  const [dropdown, setDropdown] = useState(false);
  const { data: commentData, isError } = useQuery("comments", getComments);
  const queryClient = useQueryClient();

  const commentLength = commentData?.filter(
    (comment) => comment.post_id === post.id
  ).length;

  const createLikeMutation = useMutation(
    async () => {
      const supabase = createClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        if (post.user_has_liked_post) {
          await supabase
            .from("likes")
            .delete()
            .match({ user_id: user.id, post_id: post.id });
        } else {
          await supabase
            .from("likes")
            .insert({ user_id: user.id, post_id: post.id });
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  const submitLike = () => {
    createLikeMutation.mutate();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 800,
        margin: "16px auto",
        minHeight: "10rem",
        color: "black",
        background: "transparent",
        border: "1px solid lightgray",
        borderRadius: "10px",
        width: "40rem",
      }}
    >
      <CardContent sx={{ mt: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={post.profiles.avatar_url}
            alt="User avatar_url"
            style={{
              width: "4.5%",
              borderRadius: "50%",
              marginLeft: "1rem",
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 300, fontSize: 18 }}
          >
            {post.profiles.username}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2, marginInline: 2 }}>
          {post.post}
        </Typography>
      </CardContent>
      <Box
        sx={{
          marginInline: 5,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 0.5,
          gap: 1,
          background: "none",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="div"
            sx={{ display: "flex", gap: 1 }}
            onClick={() => setDropdown(!dropdown)}
          >
            <CommentIcon
              sx={{
                color: "gray",
                width: 20,
              }}
            />
            <Typography sx={{ color: "black" }}>{commentLength}</Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", gap: 1 }}
            onClick={submitLike}
          >
            <FavoriteBorderIcon
              sx={{
                color: "gray",
                width: 20,
                ml: 2,
              }}
            />
            <Typography sx={{ color: "black" }}>{post.likes}</Typography>
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: 12,
            color: "gray",
          }}
        >
          {new Date(post.created_at).toUTCString()}
        </Typography>
      </Box>
      {dropdown && <CommentsList commentData={commentData} post={post} />}
    </Card>
  );
};

export default PostItem;
