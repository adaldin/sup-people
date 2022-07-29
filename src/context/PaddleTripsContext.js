import { createContext, useState } from "react";

// Context creation
export const PaddleTripsContext = createContext();

// Provider
export const PaddleTripsProvider = ({ children }) => {
  const [paddletrips, setPaddleTrips] = useState([]);
  return (
    <PaddleTripsContext.Provider value={{ paddletrips, setPaddleTrip }}>
      {children}
    </PaddleTripsContext.Provider>
  );
};
