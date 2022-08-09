import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../components/header/Header.js";
import PaddleTripDetail from "../components/paddleTripDetail/PaddleTripDetail.js";
import Menu from "../components/menu/Menu";
import HomeMapWrapper from "../components/homeMap/HomeMapWrapper";

export const DashboardRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<HomeMapWrapper />} />
          <Route path="/:id" element={<PaddleTripDetail />} />
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
        <Menu />
      </BrowserRouter>
    </>
  );
};
