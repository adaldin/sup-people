import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../components/header/Header.js";
import PaddleTripDetail from "../components/paddleTripDetail/PaddleTripDetail.js";
import Menu from "../components/menu/Menu";
import UserProfile from "../components/userProfile/UserProfile";
import Register from "../components/register/Register";

export const DashboardRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<PaddleTripDetail />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/register" element={<Register />} />
          <Route
            path="/profile/userProfile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Menu />
      </BrowserRouter>
    </>
  );
};
