import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Comment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const { data } = await axios.post(`/api/v1/blog/add-comment/${id}`, { comment });
      if (data?.success) {
        toast.success(data?.message);
        setComment("");
        navigate("/blogs");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto px-5 mt-5">
      <Typography variant="h4" align="center" className="font-bold mb-5">
        Comments
      </Typography>
      <Box className="flex flex-col items-center">
        <TextField
          id="outlined-multiline-flexible"
          label="Write your comment"
          multiline
          fullWidth
          maxRows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          className="mb-4 w-full md:w-2/3"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          className="w-full md:w-auto"
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Comment;
