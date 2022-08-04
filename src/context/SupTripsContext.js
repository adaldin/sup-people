import { createContext, useReducer, useContext } from "react";
import supTripReducer, { initialState } from "./supTripReducer";

// Context
export const SupTripsContext = createContext(initialState);

// Provider
export const SupTripProvider = ({ children }) => {
  const [state, dispatch] = useReducer(supTripReducer, initialState);

  const initSupTrips = (APISupTrips) => {
    dispatch({
      type: "INIT",
      payload: {
        supTrips: APISupTrips,
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

  const value = {
    supTrips: state.supTrips,
    initSupTrips,
    addSupTrip,
    removeSupTrip,
    updateSupTrip,
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
