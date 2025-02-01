import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import {useDispatch} from "react-redux";

import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const { username, password } = values;

      if (!username || !password) {
        alert("All fields are required.");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/v1/sign-in", values);
      console.log(response.data);
      dispatch(authActions.login());
      dispatch(authActions.changedRole(response.data.role));
      localStorage.setItem("id",response.data.id);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);
      navigate("/profile");

      
      // Redirect on successful login
      //navigate("/dashboard"); // Change "/dashboard" to your target route
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl font-semibold">Login</p>

        <form className="mt-4" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="text-zinc-400 block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="text-zinc-400 block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              className="w-full bg-zinc-900 text-zinc-100 p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-zinc-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
