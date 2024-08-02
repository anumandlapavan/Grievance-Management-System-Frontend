import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const AccountPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollno] = useState("");
  const [regNo, setRegno] = useState("");
  const [Branch, setBranch] = useState("");

  useEffect(() => {
    const studentDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("User is not authenticated");
          return;
        }
        console.log(token);
        const response = await fetch(
          "https://epics-final-backend.onrender.com/api/v1/students/getStudentDetails",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Student Details Response:", data);
        // Check if student data exists in the response
        if (data.success && data.studentDetails) {
          const { username, email, rollNo, regNo, Branch } =
            data.studentDetails;
          setUsername(username || "");
          setEmail(email || "");
          setRollno(rollNo || "");
          setRegno(regNo || "");
          setBranch(Branch || "");
        } else {
          console.error("Student details not found in API response");
        }
      } catch (error) {
        console.log(error);
      }
    };
    studentDetails();
  }, []);
  return (
    <div>
      <Navbar />
      <h2 className="mt-20 ml-5 mr-5 text-2xl font-semibold">Profile</h2>

      <ul className="mt-6 flex flex-col ml-5 mr-5 ">
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Name</span>
            <span>{username}</span>
          </div>
        </li>
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Email</span>
            <span>{email}</span>
          </div>
        </li>
        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Roll No</span>
            <span>{rollNo}</span>
          </div>
        </li>

        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Registration No</span>
            <span>{regNo}</span>
          </div>
        </li>

        <li className="lg:w-1/3  sm:w-full inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <span>Branch</span>
            <span>{Branch}</span>
          </div>
        </li>
      </ul>
      <button class="mt-5 ml-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <a
          class=" relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-blue-500 rounded-md group-hover:bg-opacity-0"
          href="/dashboard"
        >
          Back
        </a>
      </button>
    </div>
  );
};

export default AccountPage;
