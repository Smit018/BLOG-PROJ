// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!inputs.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(inputs.email)) {
      tempErrors.email = "Please enter a valid email";
    }

    if (!inputs.password) {
      tempErrors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      setInputs({ email: "", password: "" });
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });

      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login successfully");
        navigate("/");
      } else {
        // Display the specific error message returned by the backend
        toast.error(data.message);
      }
    } catch (error) {
      // Check if the error has a response and a message from the backend
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        // Generic error message for any other cases
        toast.error("Login failed. Please try again.");
      }
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={450}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
      >
        <Typography
          variant="h4"
          sx={{ textTransform: "uppercase" }}
          padding={3}
          textAlign="center"
        >
          Login
        </Typography>

        <TextField
          placeholder="Email"
          value={inputs.email}
          name="email"
          margin="normal"
          type={"email"}
          required
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          placeholder="Password"
          value={inputs.password}
          name="password"
          margin="normal"
          type={"password"}
          required
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          type="submit"
          sx={{ borderRadius: 3, marginTop: 3 }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/register")}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Not a user? Please Register
        </Button>
      </Box>
    </form>
  );
};

export default Login;
