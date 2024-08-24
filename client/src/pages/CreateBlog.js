import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!inputs.title || !inputs.description || !inputs.image) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={{ xs: "90%", md: "50%" }}
        border={3}
        borderRadius={10}
        padding={3}
        margin="auto"
        boxShadow={"10px 10px 20px #ccc"}
        display="flex"
        flexDirection={"column"}
        marginTop="30px"
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="gray"
        >
          Create A New Blog
        </Typography>
        <InputLabel
          sx={{ mb: 1, mt: 2, fontSize: "18px", fontWeight: "bold" }}
        >
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <InputLabel
          sx={{ mb: 1, mt: 2, fontSize: "18px", fontWeight: "bold" }}
        >
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          multiline
          rows={4}
        />
        <InputLabel
          sx={{ mb: 1, mt: 2, fontSize: "18px", fontWeight: "bold" }}
        >
          Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "SUBMIT"}
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlog;
