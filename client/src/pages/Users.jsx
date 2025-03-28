import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import React from 'react';
import { Trash2, Edit, ArrowRight } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchUsers(page);
                setUsers(data.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [page, location.state]); // Refetch when navigating back with updated data

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (err) {
            setError("Failed to delete user. Please try again.");
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-yellow-300 flex items-center justify-center">
            <div className="text-center bg-white p-8 rounded-xl shadow-2xl">
                <div className="animate-spin w-16 h-16 border-4 border-t-4 border-t-green-500 border-gray-200 rounded-full mx-auto mb-4"></div>
                <p className="text-xl font-semibold text-gray-700">Loading Users...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-yellow-300 p-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800">
                        User Management
                    </h2>
                    <button 
                        onClick={() => setPage(page + 1)} 
                        className="flex items-center bg-gradient-to-r from-green-500 to-yellow-500 
                        text-white px-4 py-2 rounded-lg hover:opacity-90 
                        transition duration-300 transform active:scale-95"
                        disabled={users.length === 0} // Disable if no more users
                    >
                        Next Page 
                        <ArrowRight className="ml-2" size={20} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map((user) => (
                        <div 
                            key={user.id} 
                            className="bg-white rounded-2xl shadow-xl overflow-hidden 
                            transform transition-all duration-300 hover:scale-105 
                            hover:shadow-2xl group"
                        >
                            <div className="bg-gradient-to-r from-green-500 to-yellow-500 p-4 flex justify-center">
                                <img 
                                    src={user.avatar} 
                                    alt={`${user.first_name} ${user.last_name}`} 
                                    className="w-32 h-32 rounded-full border-4 border-white 
                                    object-cover shadow-lg group-hover:scale-110 transition-transform"
                                />
                            </div>
                            
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {user.first_name} {user.last_name}
                                </h3>
                                <p className="text-gray-500 mb-4">{user.email}</p>
                                
                                <div className="flex justify-center space-x-4">
                                    <button 
                                        onClick={() => navigate(`/edit/${user.id}`, { state: { fromUsers: true } })}
                                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 
                                        transition duration-300 transform active:scale-95"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 
                                        transition duration-300 transform active:scale-95"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Users;
