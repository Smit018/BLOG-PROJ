import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';

const FullBlog = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
    comments: [],
  });

  // Get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
          comments: data?.blog.comments || [], // Ensure comments is an array
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  return (
    <div className="container mx-auto px-5 mt-5">
      <Typography variant="h3" align="center" className="font-bold mb-5">
        {inputs.title}
      </Typography>
      <div className="flex flex-col md:flex-row items-center">
        {inputs.image && (
          <img
            src={inputs.image}
            alt="No Valid Img available"
            className="w-full md:w-1/2 h-auto rounded-lg shadow-lg mb-6 md:mb-0"
          />
        )}
        <div className="md:ml-10 flex-1">
          <Typography variant="body1" className="text-gray-700 mb-4">
            {inputs.description}
          </Typography>
        </div>
      </div>
      {inputs.comments.length > 0 && (
        <Box className="mt-6">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-3">
            Comments:
          </Typography>
          {inputs.comments.map((comment, index) => (
            <Typography
              key={index}
              variant="body2"
              color="text.secondary"
              className="mt-1"
            >
              - {comment}
            </Typography>
          ))}
        </Box>
      )}
      <Box className="flex justify-center mt-5">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/blogs")}
        >
          Back
        </Button>
      </Box>
    </div>
  );
};

export default FullBlog;
