import React from "react";

const UpdateRenewalsButton = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const handleUpdateRenewals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${VITE_API_URL}/api/subscriptions/update-renewals`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        console.log("Renewals updated successfully.");
        alert("Renewals updated successfully!");
      } else {
        console.error("Failed to update renewals:", data.error);
        alert("Failed to update renewals.");
      }
    } catch (error) {
      console.error("Error updating renewals:", error.message);
      alert("Error updating renewals.");
    }
  };

  return (
    <button
      onClick={handleUpdateRenewals}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Update Renewals
    </button>
  );
};

export default UpdateRenewalsButton;