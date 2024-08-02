import React, { useState, useEffect } from "react";
import Complaint from "./Complaint";
import InchargeComplaint from "./InchargeComplaint";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://epics-final-backend.onrender.com/api/v1/users/getuserType",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched User Role:", data.role);
          setRole(data.role);
        } else {
          console.error("Failed to fetch user type");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserType();
  }, []);
  console.log("Role:", role);

  return (
    <div>
      <Navbar />
      {role === "categoryIncharge" ? <InchargeComplaint /> : null}
      {role === "student" ? <Complaint /> : null}
    </div>
  );
};

export default Dashboard;
