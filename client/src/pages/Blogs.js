import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLogin = Boolean(localStorage.getItem("userId"));

  // Get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
        setFilteredBlogs(data?.blogs);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleChange = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search)
    );
    setFilteredBlogs(filtered);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h3" className="text-center mb-8 font-semibold text-gray-800">
        Blogs
      </Typography>

     
      {!isLogin && (
        <Box className="mb-8 p-4 border border-red-400 rounded bg-red-100 text-center">
          <Typography variant="h6" color="error">
            You need to be logged in to add comments and create blogs.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLoginRedirect}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      )}

      <Box className="mb-8 flex justify-center">
        <TextField
          onChange={handleChange}
          value={searchTerm}
          label="Search Blogs By Title"
          variant="outlined"
          className="w-full max-w-lg"
        />
      </Box>
      {loading ? (
        <Box className="flex justify-center items-center min-h-[50vh]">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="space-y-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Box key={blog._id} className="w-full">
                <BlogCard
                  id={blog?._id}
                  isUser={localStorage.getItem("userId") === blog?.user?._id}
                  title={blog?.title}
                  description={blog?.description}
                  image={blog?.image}
                  username={blog?.user?.username}
                  time={blog.createdAt}
                  comments={blog?.comments}
                />
              </Box>
            ))
          ) : (
            <Typography variant="body1" className="text-center mt-8">
              No blogs found.
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Blogs;
