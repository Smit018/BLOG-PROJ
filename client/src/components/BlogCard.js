import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

const FALLBACK_IMAGE = "https://via.placeholder.com/400x300?text=No+Image+Available";
const truncateDescription = (description, wordLimit) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return description;
};
export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
  comments=[],
}) {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin);
  const truncatedDescription = truncateDescription(description, 100);
  const handleEdit = (event) => {
    event.stopPropagation();
    navigate(`/blog-details/${id}`);
  };

  const handleClick = (id) => {
    navigate(`/full-blog/${id}`);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentClick = (event) => {
    event.stopPropagation();
    navigate(`/comments/${id}`);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

 

  return (
    <Card
      onClick={() => handleClick(id)}
      sx={{
        maxWidth: "100%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        },
        backgroundColor: "#FFF0F5",
      }}
    >
      {isUser && (
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <IconButton onClick={handleEdit}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="username">
            {username}
          </Avatar>
        }
        title={
            username
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {formatDate(time)}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="40"
        image={image || FALLBACK_IMAGE} 
        alt="Enter Correct Url"
        className="rounded-md object-cover h-40 "
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop if fallback image fails
          e.target.src = FALLBACK_IMAGE;
        }}
      />
      <CardContent>
        
        <Typography variant="h6" className="font-bold text-gray-700">
          {`Title: ${title}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-2">
        {truncatedDescription}
        {description.split(' ').length > 100 && (
          <Link to={`/full-blog/${id}`} className="text-blue-500 ml-2">
            Read more
          </Link>
        )}
      </Typography>
        <Box mt={3}>
          <Typography variant="h6" className="font-semibold text-gray-800">
            Comments:
          </Typography>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                className="mt-1"
              >
                - {comment}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" className="mt-1">
              No comments yet.
            </Typography>
          )}
        </Box>
      </CardContent>
      {isLogin && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="outlined"
            onClick={handleCommentClick}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Add Comment
          </Button>
        </Box>
      )}
    </Card>
  );
}
