import { createContext, useContext, useReducer } from "react";
import supTripReducer, { initialState } from "./supTripReducer";

// Context
export const SupTripsContext = createContext(initialState);

// Provider
export const SupTripProvider = ({ children }) => {
  const [state, dispatch] = useReducer(supTripReducer, initialState);

  const initSupTrips = (APISupTrips) => {
    let dateToday = new Date();
    const upcomingTripsUnorderer = APISupTrips.sort((a, b) => {
      const newA = new Date(a.supTripDate);
      const newB = new Date(b.supTripDate);
      return newA - newB;
    });
    let updatedUpcomingTrips = upcomingTripsUnorderer.filter((trip) => {
      let tripDate = new Date(trip.supTripDate);
      return tripDate >= dateToday;
    });
    dispatch({
      type: "INIT",
      payload: {
        supTrips: APISupTrips,
        upcomingSupTrips: updatedUpcomingTrips,
      },
    });
  };

  const addSupTrip = (supTrip) => {
    const updatedSupTrips = state.supTrips.concat(supTrip);
    dispatch({
      type: "ADD_TRIP",
      payload: {
        supTrips: updatedSupTrips,
      },
    });
  };

  const removeSupTrip = (supTrip) => {
    const updatedSupTrips = state.supTrips.filter(
      (currentSupTrip) => currentSupTrip.id !== supTrip.id
    );
    dispatch({
      type: "REMOVE_TRIP",
      payload: {
        supTrips: updatedSupTrips,
      },
    });
  };

  const updateSupTrip = (supTrip) => {
    const updatedSupTrips = state.supTrips.map((el) => {
      return el.id === supTrip.id ? supTrip : el;
    });

    dispatch({
      type: "UPDATE_TRIP",
      payload: {
        supTrips: updatedSupTrips,
      },
    });
  };

  const getWaypoints = (entry, exit) => {
    const updatedWaypoints = {
      ...state.currentWaypoints,
      entryPoint: {
        lat: entry.lat,
        lng: entry.lng,
      },
      exitPoint: {
        lat: exit.lat,
        lng: exit.lng,
      },
    };
    dispatch({
      type: "GET_WAYPOINTS",
      payload: {
        currentWaypoints: updatedWaypoints,
      },
    });
  };

  const value = {
    supTrips: state.supTrips,
    upcomingSupTrips: state.upcomingSupTrips,
    currentWaypoints: state.currentWaypoints,
    initSupTrips,
    addSupTrip,
    removeSupTrip,
    updateSupTrip,
    getWaypoints,
  };

  return (
    <SupTripsContext.Provider value={value}>
      {children}
    </SupTripsContext.Provider>
  );
};

// useContext Hook
const useSupTrips = () => {
  const context = useContext(SupTripsContext);

  if (context === undefined) {
    throw new Error("useSupTrips must be used within SupTripsContext");
  }
  return context;
};
export default useSupTrips;
