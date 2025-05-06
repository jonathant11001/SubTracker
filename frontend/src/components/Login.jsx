import React from "react";
import TopLandingNav from "./navbar/TopLandingNav";

const Login = () => {
  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#30E0C6] min-h-screen text-white">
        <TopLandingNav />
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="max-w-md mx-auto bg-white p-6 rounded shadow-md text-black">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                    type="email"
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="Enter your email"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                    type="password"
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="Enter your password"
                />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
                Login
            </button>
        </form>
    </div>
  );
};

export default Login;