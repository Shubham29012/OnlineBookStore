import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-[88vh] bg-zinc-900 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>

        <div className="mt-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-zinc-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Email"
              name="email"
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
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Password"
              name="password"
              required
            />
          </div>

          {/* Login Button */}
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Login
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-zinc-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
