import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../header/Header.js";

export const DashboardRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
