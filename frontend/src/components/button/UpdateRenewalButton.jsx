import React from "react";

const UpdateRenewalsButton = () => {
  const handleUpdateRenewals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subscriptions/update-renewals", {
        method: "POST",
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