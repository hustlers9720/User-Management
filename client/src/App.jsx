import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import EditUsers from "./pages/EditUsers";
import React from 'react';
import "./index.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/edit/:id" element={<EditUsers />} />
    </Routes>
  </BrowserRouter>
);

export default App;
