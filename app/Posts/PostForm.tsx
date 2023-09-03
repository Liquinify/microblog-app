import { supabase } from "@/app/utils/supabaseClient";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../hooks/currentUser";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 430,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostForm = () => {
  const [modal, setModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const { data: currentUser } = useCurrentUser();

  const handleNewPost = async (formData) => {
    const { title, description } = formData;

    const newPost = {
      id: Date.now(),
      title: title,
      description: description,
    };
    const { data, error } = await supabase.from("Posts").upsert([newPost]);
    setModal(false);
  };

  return (
    <div>
      {currentUser?.user_metadata.userType === "Commentator" ? (
        ""
      ) : (
        <Button
          onClick={() => setModal(true)}
          sx={{ mt: 2, ml: 2, border: "1px solid gray" }}
        >
          Create post
        </Button>
      )}
      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            component="form"
            onSubmit={handleSubmit(handleNewPost)}
          >
            <Typography id="modal-modal-title" variant="h2" component="h2">
              Create Post
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              {...register("title")}
            />
            <TextField
              margin="normal"
              required
              multiline
              fullWidth
              label="Description"
              id="description"
              {...register("description")}
              inputProps={{
                style: {
                  height: "80px",
                },
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Create post
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default PostForm;
