import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://reqres.in/api/login", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/users");
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-200 to-yellow-200 flex items-center justify-center px-4 py-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100 transform transition-all hover:scale-105 duration-300">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-yellow-500">
                    User Login
                </h2>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 hover:border-green-400"
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 hover:border-yellow-400"
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white py-3 rounded-lg 
                        hover:from-green-600 hover:to-yellow-600 
                        transition duration-300 
                        transform hover:scale-[1.02] 
                        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;