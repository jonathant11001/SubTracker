import React from "react";

const SubscriptionList = ({ subscriptions }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Subscription List</h2>
      {subscriptions.length === 0 ? (
        <p className="text-gray-500">No subscriptions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-bold">{sub.name}</h3>
              <p className="text-sm">Price: ${sub.price}</p>
              <p className="text-sm">Renewal Date: {new Date(sub.renewalDate).toLocaleDateString()}</p>
              <p className="text-sm">Category: {sub.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;