import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import logoImage from "../assets/images.jpeg";
const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [regNo, setregNo] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [Branch, setBranch] = useState("");
  const [role, setRole] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all details!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    try {
      const body = {
        username,
        email,
        password,
        confirmPassword,
        regNo,
        rollNo,
        Branch,
        role,
      };
      const response = await fetch(
        "https://epics-final-backend.onrender.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        toast.error("Only College Emails are allowed");
        return;
      } else {
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        console.log("User Registered successfully:", data);
        // Show toast notification on successful submission
        toast.success("User Registered successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        window.location = "/dashboard";
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white">
      <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 lg:w-1/2 xl:w-2/5 bg-gray-800 rounded-xl shadow-md p-6">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
          <img
            src={logoImage}
            alt="Logo"
            className="w-32 h-32 rounded-full mb-4"
          />
          <p className="text-lg font-semibold">NIT AP Grievance Cell</p>
        </div>

        {/* Right Section - Form */}
        <form className="flex flex-col md:w-2/3" onSubmit={handleSubmit}>
          <div class="flex space-x-4 mb-4">
            <input
              placeholder="User Name(Full Name)"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <input
            placeholder="Email"
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <div class="flex space-x-4 mb-4">
            <input
              placeholder="Registration No"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              value={regNo}
              onChange={(e) => setregNo(e.target.value)}
            />
            <input
              placeholder="Roll No"
              class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </div>
          <label class="text-sm mb-2 text-gray-200 cursor-pointer" for="branch">
            Branch
          </label>
          <select
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="branch"
            value={Branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="branch">Branch</option>
            <option value="CSE">Computer Science and Engineering</option>
            <option value="ECE">
              Electronics Communications and Engineering
            </option>
            <option value="MECH">Mechanical Enginnering</option>
            <option value="EEE">Electrical Enginnering</option>
            <option value="CIV">Civil Enginnering</option>
            <option value="MET">Metallurgy</option>
            <option value="CHE">Chemical Enginnering</option>
            <option value="BIO">BioTechnology Enginnering</option>
          </select>

          <label class="text-sm mb-2 text-gray-200 cursor-pointer" for="gender">
            Role
          </label>
          <select
            class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="role">Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <p class="text-white mt-4">
            Already have an account?
            <a class="text-sm text-blue-500 -200 hover:underline mt-4" href="/">
              Login
            </a>
          </p>
          <button
            class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Signup;
