import React, { useState, useEffect } from "react";
import AddSubscription from "./AddSubscription";
import SubscriptionList from "./subscriptionList";
import axios from "axios";
import './index.css'

const Home = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subscriptions");
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error.message);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleSubscriptionAdded = (newSubscription) => {
    setSubscriptions((prev) => [...prev, newSubscription]); // Add the new subscription to the list
  };

  return (
    <div class="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#30E0C6]">
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">SubTracker</h1>
      </header>
      <main className="p-6">
        <AddSubscription onSubscriptionAdded={handleSubscriptionAdded} />
        <SubscriptionList subscriptions={subscriptions} />
      </main>
    </div>
  );
};

export default Home;