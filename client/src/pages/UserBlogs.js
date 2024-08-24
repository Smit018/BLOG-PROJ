import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading"
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
const [loading, setLoading] = useState(true);
  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      {loading && <Loading className="h-screen w-full flex justify-center items-center text-center"/>}
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        !loading &&<h1 className="text-3xl text-center mt-10 font-bold text-gray-500 ">You Haven't Created Any blogs Yet</h1>
      )}
    </div>
  );
};

export default UserBlogs;