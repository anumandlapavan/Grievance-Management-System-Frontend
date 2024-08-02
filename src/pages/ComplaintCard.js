import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { toast } from "react-hot-toast";

const ComplaintCard = ({ complaints, complaint, setComplaints }) => {
  const [complaintDetails, setComplaintDetails] = useState("");
  const [detailsSelected, setDetailsSelected] = useState(false);

  const formatTimestamp1 = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const deleteComplaint = async (complaintId) => {
    try {
      const response = await fetch(
        `https://epics-final-backend.onrender.com/api/v1/complaints/deleteComplaintById/${complaintId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setComplaints(
          complaints.filter((complaint) => complaint._id !== complaintId)
        );
        toast.success("Complaint deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.error("Failed to delete complaint");
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const updateComplaintStatus = async (complaintId) => {
    const id = toast.loading("Please Wait...");
    try {
      const response = await fetch(
        `https://epics-final-backend.onrender.com/api/v1/complaints/updateComplaintStatus/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "resolved" }), // Set the status to 'resolved'
        }
      );

      if (response.ok) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === complaintId
              ? { ...complaint, status: "resolved" }
              : complaint
          )
        );
        toast.success("Resolved the Issue!");
      } else {
        toast.error("Failed to resolve issue!");
        console.error(
          "Failed to update complaint status:",
          response.statusText
        );
      }
      toast.dismiss(id);
    } catch (error) {
      toast.error("Failed to resolve issue!");
      console.error("Error updating complaint status:", error);
    }
  };

  useEffect(() => {
    fetchComplaintDetails(complaint._id);
  }, []);

  const detailsHandler = async () => {
    setDetailsSelected(!detailsSelected);
  };

  const fetchComplaintDetails = async (complaintId) => {
    try {
      console.log(complaintId);
      let response = await fetch(
        `https://epics-final-backend.onrender.com/api/v1/complaints/getComplaintDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ complaintId: complaintId }),
        }
      ); 
      response = await response.json();
      setComplaintDetails(response.data);
      console.log("RESSNID", response.data.student.username);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      key={complaint._id}
      className="relative transition-all duration-200 cursor-pointer hover:scale-[1.05] flex flex-col gap-[1rem] h-full rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
    >
      <div>
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
        <div className="flex mt-3 space-x-3">
          <button
            className={clsx(
              "group flex w-1/3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white hover:scale-105 transition-all duration-200 text-sm",
              complaint.status === "resolved" ? "bg-green-500" : "bg-red-600"
            )}
            onClick={() => updateComplaintStatus(complaint._id)}
          >
            <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
              {complaint.status === "pending" ? "Pending" : "Resolved"}
            </span>
          </button>
          <button
            className="group flex w-1/3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white hover:scale-105 transition-all duration-200 text-sm bg-red-600"
            onClick={() => deleteComplaint(complaint._id)}
          >
            <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
              Delete
            </span>
          </button>
          <button
            className="group flex w-1/3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white hover:scale-105 transition-all duration-200 text-sm bg-blue-600"
            onClick={detailsHandler}
          >
            <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
              {detailsSelected ? "Hide Details" : "Show Details"}
            </span>
          </button>
        </div>
      </div>
      {detailsSelected && complaintDetails && (
        <div className="mt-4 text-[1rem] font-semibold">
          <div className="text-[1rem] font-semibold">
            Name:{" "}
            <span className="text-[1rem] font-medium">
              {complaintDetails.student.username}
            </span>
          </div>
          <div className="text-[1rem] font-semibold">
            Roll No:{" "}
            <span className="text-[1rem] font-medium">
              {complaintDetails.student.rollNo}
            </span>
          </div>
          <div className="text-[1rem] font-semibold">
            Registration No:{" "}
            <span className="text-[1rem] font-medium">
              {complaintDetails.student.regNo}
            </span>
          </div>
          <div className="text-[1rem] font-semibold">
            Branch:{" "}
            <span className="text-[1rem] font-medium">
              {complaintDetails.student.Branch}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintCard;
  