import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ComplaintCard from "./ComplaintCard";

const InchargeCategoryPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const fetchComplaintsByCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `https://epics-final-backend.onrender.com/api/v1/complaints/getComplaintsByCategory/${categoryId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setComplaints(data.complaints);
        setCategoryName(data.categoryName.categoryName);
      } else {
        console.error("Failed to fetch complaints by category");
      }
    } catch (error) {
      console.error("Error fetching complaints by category:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const category = decodedToken.assignedCategories[0];
      setCategoryId(category);
      fetchComplaintsByCategory(category);
    } else {
      console.error("User is not authenticated");
    }
  }, []);

  return (
    <div className="bg-gray-800 px-4 py-8 sm:p-8 md:p-10">
      <h1 className="text-2xl text-gray-100 font-bold mt-20 mb-8">{`Complaints - ${categoryName}`}</h1>
      {complaints.length === 0 ? (
        <p className="ml-4 mt-2 text-gray-100 text-2xl">
          No complaints found for this category.
        </p>
      ) : (
        <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
          {complaints.map((complaint) => (
            <ComplaintCard
              complaint={complaint}
              complaints={complaints}
              setComplaints={setComplaints}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InchargeCategoryPage;
