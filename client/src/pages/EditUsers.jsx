import { useState, useEffect } from "react";
import { updateUser, fetchUserById } from "../api"; // Assuming there's a specific function for fetching a user
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
const EditUsers = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user details when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await fetchUserById(id); // Ensure you have this API function
                if (userData) {
                    setUser({
                        first_name: userData.first_name || "",
                        last_name: userData.last_name || "",
                        email: userData.email || "",
                    });
                } else {
                    throw new Error("User not found");
                }
            } catch (err) {
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, user);
            navigate("/users", { state: { updated: true } }); // Pass state to trigger refetch in Users
        } catch (err) {
            setError("Failed to update user.");
        }
    };

    if (loading) return <div className="text-center mt-5 text-lg font-bold">Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Edit User</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm mb-1">First Name</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.first_name}
                            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                            placeholder="First Name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Last Name</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.last_name}
                            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                            placeholder="Last Name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/users")}
                            className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUsers;
