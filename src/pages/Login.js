import React from "react";
import { useState } from "react";
import logoImage from "../assets/images.jpeg";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch(
        "https://epics-final-backend.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location = "/dashboard";
        toast.success("Login Successfully");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center ">
      <div
        style={{
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          backgroundColor: "#2d3748",
          borderRadius: "0.75rem",
          overflow: "hidden",
        }}
        className="bg-gray-800 md:w-[700px] rounded-lg shadow-xl w-full sm:w-96 p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            NIT AP COLLEGE GRIEVANCE CELL
          </h2>
          <img
            src={logoImage}
            alt="Logo"
            className="mx-auto rounded-full"
            style={{ width: "170px", height: "170px" }}
          />
        </div>
        <div className="p-1 w-full">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Login
          </h2>
          <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
          <form
            method="POST"
            action="#"
            className="mt-8 space-y-6"
            onSubmit={onSubmit}
          >
            <div className="rounded-md shadow-sm">
              <div>
                <label class="sr-only" for="email">
                  Email{" "}
                </label>
                <input
                  placeholder="Email address"
                  class="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required=""
                  autocomplete="email"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="mt-4">
                <label class="sr-only" for="password">
                  Password
                </label>
                <input
                  placeholder="Password"
                  class="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required=""
                  autocomplete="current-password"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                />
                <label
                  className="ml-2 text-sm text-gray-400"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a
                  class="font-medium text-indigo-500 hover:text-indigo-400"
                  href="/forgotpassword"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-sm font-medium text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="px-8 py-4 mt-8 bg-gray-700 text-center">
          <span className="text-gray-400">Don't have an account?</span>
          <a
            className="ml-2 font-medium text-indigo-500 hover:text-indigo-400"
            href="/signup"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
