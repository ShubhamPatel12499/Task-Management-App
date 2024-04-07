import React from "react";
import { Route, Routes } from "react-router-dom";
import AddTaskPage from "../Pages/AddTaskPage";
import ViewTaskPage from "../Pages/ViewTaskPage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

export const AllRoutes = () => {

  return (
    <Routes>
      <Route path="/addTask" element={<AddTaskPage />} /> 
      <Route path="/viewTask" element={<ViewTaskPage />} />
      <Route path="/" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} /> 
    </Routes>
  );
};