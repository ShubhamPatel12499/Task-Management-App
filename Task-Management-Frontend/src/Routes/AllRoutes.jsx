import React from "react";
import { Route, Routes } from "react-router-dom";
import AddTaskPage from "../Pages/AddTaskPage";
import ViewTaskPage from "../Pages/ViewTaskPage";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AddTaskPage />} />
      <Route path="/viewTask" element={<ViewTaskPage />} />
    </Routes>
  );
};