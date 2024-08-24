import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";
import FullBlog from "./pages/FullBlog";
import Comments from "./pages/Comment";
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <Toaster />
      <main className="flex-grow ">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/my-blogs" element={<UserBlogs />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/full-blog/:id" element={<FullBlog />} />
          <Route path="/comments/:id" element={<Comments />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
