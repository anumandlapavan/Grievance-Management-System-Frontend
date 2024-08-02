import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").pop();
    console.log(token);
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords are not matching");
      return;
    }
    try {
      const response = await fetch(
        `https://epics-final-backend.onrender.com/api/v1/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, confirmPassword, token }),
        }
      );

      if (response.ok) {
        toast.success("Password updated successfully");
        window.location = "/";
      } else {
        const data = await response.json();
        toast.error("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert(
        "An error occurred while updating your password. Please try again."
      );
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="max-w-[500px] p-4 lg:p-8 bg-gray-800">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
          Choose new password
        </h1>
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-white">
          Almost done.Enter your new password and your all set.
        </p>
        <form onSubmit={handleOnSubmit}>
          <label className="relative">
            <p className="mb-1 text-xl leading-[1.375rem] text-white">
              New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {/* {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )} */}
            </span>
          </label>
          <label className="relative mt-3 block">
            <p className="mb-1 text-xl leading-[1.375rem] text-white">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {/* {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )} */}
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-indigo-500 py-[12px] px-[12px] font-medium text-richblack-900"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/">
            <p className="flex items-center gap-x-2 text-white text-xl">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
