import React, { useState } from "react";
import axios from "axios";

const AddSubscription = ({ onSubscriptionAdded }) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    name: "",
    price: "",
    startDate: "",
    category: "",
    typeOfSubscription: "",
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
        `${VITE_API_URL}/api/subscriptions`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({
        name: "",
        price: "",
        startDate: "",
        category: "",
        typeOfSubscription: "",
      });

      onSubscriptionAdded(response.data);
    } catch (error) {
      console.error("Error adding subscription:", error.message);
      setError("Failed to add subscription.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-6 text-black">
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

      <select
        className="border p-2 mb-2 w-full"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Productivity & Software">Productivity & Software</option>
        <option value="Shopping & Delivery">Shopping & Delivery</option>
        <option value="Education & Learning">Education & Learning</option>
        <option value="News & Publications">News & Publications</option>
        <option value="Health & Wellness">Health & Wellness</option>
        <option value="Finance & Tools">Finance & Tools</option>
        <option value="Web Services & Hosting">Web Services & Hosting</option>
        <option value="Others">Others</option>
      </select>

      <select
        className="border p-2 mb-2 w-full"
        value={form.typeOfSubscription}
        onChange={(e) => setForm({ ...form, typeOfSubscription: e.target.value })}
      >
        <option value="">Select Subscription Type</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition">
        Add
      </button>
    </form>
  );
};

export default AddSubscription;