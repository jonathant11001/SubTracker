import { useState, useEffect } from "react";
import AddSubscription from "./subscriptionMaker/AddSubscription";
import axios from "axios";
import TopMainNav from "./navbar/TopMainNav";
import UpdateRenewalsButton from "./button/UpdateRenewalButton";
import useUserTheme from "../hooks/useUserTheme";

const SubscriptionList = () => {
  const [theme] = useUserTheme();

  const [subscriptions, setSubscriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${VITE_API_URL}/api/subscriptions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error.message);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleAddSubscription = (newSubscription) => {
    setSubscriptions((prev) => [...prev, newSubscription]); 
    setShowModal(false);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSubscriptions([]); 
    } else {
      setSelectedSubscriptions(subscriptions.map((sub) => sub._id)); 
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id) => {
    if (selectedSubscriptions.includes(id)) {
      setSelectedSubscriptions(selectedSubscriptions.filter((subId) => subId !== id)); // Deselect
    } else {
      setSelectedSubscriptions([...selectedSubscriptions, id]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedSubscriptions.map((id) =>
          axios.delete(`${VITE_API_URL}/api/subscriptions/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      );
      setSubscriptions((prev) =>
        prev.filter((sub) => !selectedSubscriptions.includes(sub._id))
      );
      setSelectedSubscriptions([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting subscriptions:", error.message);
    }
  };

  return (
    <div
      style={{ background: theme.backgroundColor, minHeight: "100vh" }}
      className="text-white"
    >
      <TopMainNav />
      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Subscriptions</h2>
          <div className="flex space-x-2">
            <UpdateRenewalsButton />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              + Add Subscription
            </button>
          </div>
        </div>
        <div
          className="rounded-lg shadow-md p-4"
          style={{
            background: theme.componentColor === "FFFFFF" ? "#FFFFFF" : `#${theme.componentColor}`,
            color: theme.componentColor === "FFFFFF" ? "#000" : "#FFF"
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                style={{
                  color: theme.componentColor === "FFFFFF" ? "#000" : "#FFF",
                  background: theme.componentColor === "FFFFFF" ? "#FFF" : `#${theme.componentColor}`,
                  borderColor: "#ccc"
                }}
              />
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                style={{
                  color: "#000",
                  background: "#e5e5e5"
                }}
              >
                Filter
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDeleteSelected} 
                disabled={selectedSubscriptions.length === 0}
              >
                Delete
              </button>
            </div>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr
                className="bg-gray-100"
                style={{
                  background: theme.componentColor === "FFFFFF" ? "#F3F4F6" : `#${theme.componentColor}`,
                  color: theme.componentColor === "FFFFFF" ? "#000" : "#FFF"
                }}
              >
                <th className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">Previous Renew</th>
                <th className="border border-gray-300 px-4 py-2">Renewal Date</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Type of Subscription</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedSubscriptions.includes(sub._id)}
                      onChange={() => handleRowSelect(sub._id)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{sub.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${sub.price.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(sub.startDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(sub.previousRenewalDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(sub.renewalDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{sub.category}</td>
                  <td className="border border-gray-300 px-4 py-2">{sub.typeOfSubscription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
          <div
            className="p-6 rounded-lg shadow-lg w-full max-w-md"
            style={{
              background: theme.componentColor === "FFFFFF" ? "#FFFFFF" : `#${theme.componentColor}`,
              color: theme.componentColor === "FFFFFF" ? "#000" : "#FFF"
            }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <AddSubscription onSubscriptionAdded={handleAddSubscription} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;