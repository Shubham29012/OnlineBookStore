import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      const { username, email, password, address } = Values;

      if (!username || !email || !password || !address) {
        alert("All Fields are Required");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/v1/sign-up", Values);
      alert(response.data.message);
      navigate("/Login");
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>

        <div className="mt-4">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              aria-label="Username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Username"
              name="username"
              value={Values.username}
              onChange={change}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mt-4">
            <label htmlFor="email" className="text-zinc-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              aria-label="Email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@gmail.com"
              name="email"
              value={Values.email}
              onChange={change}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              aria-label="Password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Password"
              name="password"
              value={Values.password}
              onChange={change}
              required
            />
          </div>

          {/* Address Input */}
          <div className="mt-4">
            <label htmlFor="address" className="text-zinc-400">
              Address
            </label>
            <input
              type="text"
              id="address"
              aria-label="Address"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Address"
              name="address"
              value={Values.address}
              onChange={change}
              required
            />
          </div>

          {/* Sign Up Button */}
          <div className="mt-6">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded transition-all duration-300 hover:bg-blue-600"
              onClick={submit}
              aria-label="Sign Up"
            >
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <p className="text-zinc-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
