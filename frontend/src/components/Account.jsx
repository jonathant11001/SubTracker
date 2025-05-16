import React from "react";
import TopMainNav from "./navbar/TopMainNav";

const Account = () => {
    const handleLogout = async () => {
        localStorage.removeItem("token");
        fetch("http://localhost:5000/api/users/logout", { method: "POST", credentials: "include" })
            .finally(() => {
                window.location.href = "/login";
            });
    };

    return (
        <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#30E0C6] min-h-screen text-white">
            <TopMainNav />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Account Settings</h1>
                <p className="text-lg mb-8">Manage your account settings here.</p>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Account;