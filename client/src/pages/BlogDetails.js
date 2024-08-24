import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const id = useParams().id;
  const navigate = useNavigate();

  // Fetch blog details
  const getBlogDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // Input change handler
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form validation
  const validate = () => {
    let tempErrors = {};
    if (!inputs.title) tempErrors.title = "Title is required";
    if (!inputs.description) tempErrors.description = "Description is required";
    if (!inputs.image) tempErrors.image = "Image URL is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setUpdating(true);
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update blog. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

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
          Update Your Post
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
          error={!!errors.title}
          helperText={errors.title}
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
          error={!!errors.description}
          helperText={errors.description}
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
          error={!!errors.image}
          helperText={errors.image}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={updating}
        >
          {updating ? <CircularProgress size={24} /> : "UPDATE"}
        </Button>
      </Box>
    </form>
  );
};

export default BlogDetails;
