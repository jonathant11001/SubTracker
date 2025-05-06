import React, { useState } from "react";
import axios from "axios";

const AddSubscription = ({ onSubscriptionAdded }) => {
  const [form, setForm] = useState({ name: "", price: "", renewalDate: "", category: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.renewalDate || !form.category) {
      setError("All fields are required.");
      return;
    }
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/subscriptions", form);
      setForm({ name: "", price: "", renewalDate: "", category: "" });
      onSubscriptionAdded(response.data); // Notify parent component of the new subscription
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
        value={form.renewalDate}
        onChange={(e) => setForm({ ...form, renewalDate: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition">
        Add
      </button>
    </form>
  );
};

export default AddSubscription;