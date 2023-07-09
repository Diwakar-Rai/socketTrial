import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLanding from "../pages/AdminLanding";
import Trainee from "../pages/Trainee";
import Login from "./Login";
import Protected from "./Protected";
import AssignTask from "../pages/AssignTask";

const Troutes = () => {
  let admin = JSON.parse(sessionStorage.getItem("manager"));
  let employee = JSON.parse(sessionStorage.getItem("employee"));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/trainee"
          element={
            <Protected isLoggedIn={employee}>
              <Trainee />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <Protected isLoggedIn={admin}>
              <AdminLanding />
            </Protected>
          }
        />
        <Route
          path="/assignTask/:id"
          element={
            <Protected isLoggedIn={admin}>
              <AssignTask />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
};

export default Troutes;
