import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        return response.data.token;
    } catch (error) {
        throw new Error("Invalid login credentials");
    }
};

export const fetchUsers = async (page = 1) => {
    const response = await axios.get(`${API_BASE_URL}/users?page=${page}`);
    return response.data;
};

export const fetchUserById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        return data.data; // Adjust based on the actual API response structure
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const updateUser = async (id, userData) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
};
