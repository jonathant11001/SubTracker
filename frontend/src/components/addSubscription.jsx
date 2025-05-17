import React, { useState } from "react";
import axios from "axios";

const AddSubscription = ({ onSubscriptionAdded }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    startDate: "",
    category: "",
    typeOfSubscription: "",
    notification: false,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.price ||
      !form.startDate ||
      !form.category ||
      !form.typeOfSubscription
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/subscriptions",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({
        name: "",
        price: "",
        startDate: "",
        category: "",
        typeOfSubscription: "",
        notification: false,
      });

      onSubscriptionAdded(response.data);
    } catch (error) {
      console.error("Error adding subscription:", error.message);
      setError("Failed to add subscription.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-6">
      <h2 className="text-xl font-bold mb-4">Add Subscription</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="border p-2 mb-2 w-full"
        type="date"
        placeholder="Start Date"
        value={form.startDate}
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
      />

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <select
        className="border p-2 mb-2 w-full"
        value={form.typeOfSubscription}
        onChange={(e) => setForm({ ...form, typeOfSubscription: e.target.value })}
      >
        <option value="">Select Subscription Type</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          className="mr-2"
          checked={form.notification}
          onChange={(e) => setForm({ ...form, notification: e.target.checked })}
        />
        <label className="text-sm">Enable Notifications</label>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition">
        Add
      </button>
    </form>
  );
};

export default AddSubscription;