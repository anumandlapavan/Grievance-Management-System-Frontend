import React from "react";
import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import { jwtDecode } from "jwt-decode";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const formatTimestamp1 = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    userId: "",
  });
  const [categories, setCategories] = useState([]);
  const [submittedComplaints, setSubmittedComplaints] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://epics-final-backend.onrender.com/api/v1/category/getCategories"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategories();

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("User is not authenticated");
          return;
        }
        const response = await fetch(
          "https://epics-final-backend.onrender.com/api/v1/users/getuserData",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setFormData({ ...formData, userId: userData.userId });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://epics-final-backend.onrender.com/api/v1/complaints/submitComplaint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Complaint submitted successfully:", data);
        // Show toast notification on successful submission
        toast.success("Complaint submitted successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setSubmittedComplaints([...submittedComplaints, data]);
        // // Clear form fields or show success message
        // setFormData({ title: '', description: '', category: '' });
      } else {
        console.error("Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error.message);
    }
  };
  return (
    <section class="bg-gray-800 py-12 text-gray-800 sm:py-24 h-full ">
      <div class="bg-gray-800 mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
        <div class="max-w-2xl px-4 lg:pr-24">
          <p class="mb-2 text-2xl text-blue-400">Grievance Cell</p>
          <h3 class="mb-5 text-3xl font-semibold">Submit Your Grievance</h3>
          <p class="mb-16 text-md text-gray-100 text-1xl">
            College Grievance Redressal ensures a swift and confidential
            resolution of student concerns. We guarantee a quick response to
            submitted complaints, fostering a secure and comfortable living
            environment for all students.
          </p>
          <div class="mb-5 flex font-medium">
            <div class="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-7 w-7 text-blue-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                />
              </svg>
            </div>
            <div class="">
              <p class="mb-2">Swift Grievance Resolution</p>
              <span class="font-normal text-gray-100">
                Swift grievance resolution prioritizes timely and effective
                solutions, ensuring students' concerns are promptly addressed
                and resolved.
              </span>
            </div>
          </div>
          <div class="mb-5 flex font-medium">
            <div class="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-7 w-7 text-blue-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <div class="">
              <p class="mb-2">Confidentiality Assured</p>
              <span class="font-normal text-gray-100">
                Your grievances are handled with utmost confidentiality,
                ensuring privacy and trust throughout the college grievance
                redressal process .
              </span>
            </div>
          </div>
          <div class="mb-5 flex font-medium">
            <div class="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-7 w-7 text-blue-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <div class="">
              <p class="mb-2">Easy Communication</p>
              <span class="font-normal text-gray-100">
                Effortless communication is facilitated, providing a smooth and
                accessible channel for expressing and resolving grievances
                within the campus community.
              </span>
            </div>
          </div>
        </div>
        <div class="border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
          <div class="relative border-b border-gray-300 p-4 py-8 sm:px-8">
            <h3 class="mb-1 inline-block text-3xl font-medium">
              <span class="mr-4">Submit Complaint</span>
              <span class="inline-block rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700 sm:inline">
                Quick Response
              </span>
            </h3>
            <p class="text-gray-600">
              Contact us for college grievance redressal
            </p>
          </div>

          <div className="mt-4 pt-4">
            <form onSubmit={handleSubmit}>
              <label>
                Category:
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  class=" mr-8 peer mt-8 w-2/3 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                >
                  <option values="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <label>
                  Title:
                  <input
                    type="text"
                    placeholder="Enter your Complaint Title ( Water , AC issue ...)"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    class="peer mt-5 w-2/3 resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                    required
                  />
                </label>
              </div>

              <label class="mt-5 mb-2 inline-block max-w-full">
                Tell us about your grievance:
                <textarea
                  name="description"
                  class="mb-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </label>

              <button
                type="submit"
                class=" px-12 mb-4 w-2/3 rounded-lg border border-blue-700 bg-blue-700 p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-blue-600 hover:text-white"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async (userId) => {
    try {
      const response = await fetch(
        `https://epics-final-backend.onrender.com/api/v1/complaints/getComplaintsByStudent/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Could not retrieve complaints");
      const data = await response.json();
      console.log("Complaints Data:", data);
      setComplaints(data.complaints);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const userId = jwtDecode(token).id;
      console.log(userId);
      getComplaints(userId);
    } else {
      window.location.replace("/login");
    }
  }, []);
  return (
    <div className="bg-gray-800 px-4 py-[20rem] sm:p-8 md:p-10">
      <h1 className="text-3xl font-bold mt-20 mb-8 text-gray-100">Complaints</h1>
      {complaints === null ? (
        <p className="ml-4 mt-2 text-gray-600 text-xl">Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="ml-4 mt-2 text-gray-600 text-xl">
          No complaints registered yet.
        </p>
      ) : (
        <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="relative cursor-pointer hover:scale-[1.05] transition-all duration-200 flex h-full flex-col justify-center items-center rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
            >
              <div className="text-lg mb-2 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-2xl">
                {complaint.title}
              </div>
              <p className="text-sm">
                Created on {formatTimestamp1(complaint.createdAt)}
              </p>
              <div
                className="text-md leading-normal text-gray-400 sm:block overflow-hidden"
                style={{ maxHeight: "100px" }}
              >
                {complaint.description}
              </div>
              <button
                className={clsx(
                  "group flex w-1/3 mt-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm",
                  complaint.status == "resolved" ? "bg-green-500" : "bg-red-600"
                )}
              >
                <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                  {complaint.status == "resolved"
                    ? "Completed"
                    : "Not Completed"}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Render complaint form component */}
      <ComplaintForm />
    </div>
  );
};
export default ComplaintsPage;
