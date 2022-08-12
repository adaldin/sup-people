import { createContext, useReducer, useContext } from "react";
import supTripReducer, { initialState } from "./supTripReducer";

// Context
export const SupTripsContext = createContext(initialState);

// Provider
export const SupTripProvider = ({ children }) => {
  const [state, dispatch] = useReducer(supTripReducer, initialState);

  const initSupTrips = (APISupTrips) => {
    let dateToday = new Date()
      .toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split(",")[0];

    let upcomingTripsUnorderer = APISupTrips.filter(
      (trip) => trip.supTripDate >= dateToday
    );

    const updatedUpcomingTrips = upcomingTripsUnorderer.sort((a, b) => {
      const newA = a.supTripDate.split("/").reverse().join("-");
      const newB = b.supTripDate.split("/").reverse().join("-");
      return +new Date(newA) - +new Date(newB);
    });

    dispatch({
      type: "INIT",
      payload: {
        supTrips: APISupTrips,
        upcomingSupTrips: updatedUpcomingTrips,
      },
    });
  };

  // const initUpcomings = (state) => {
  //   let dateToday = new Date()
  //     .toLocaleString("en-GB", {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //     })
  //     .split(",")[0];

  //   let upcomingTripsUnorderer = state.supTrips.filter(
  //     (trip) => trip.supTripDate >= dateToday
  //   );

  //   const updatedUpcomingTrips = upcomingTripsUnorderer.sort((a, b) => {
  //     const newA = a.supTripDate.split("/").reverse().join("-");
  //     const newB = b.supTripDate.split("/").reverse().join("-");
  //     return +new Date(newA) - +new Date(newB);
  //   });

  //   dispatch({
  //     type: "INIT_UPCOMINGS",
  //     payload: {
  //       upcomingSupTrips: updatedUpcomingTrips,
  //     },
  //   });
  // };

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
    upcomingSupTrips: state.upcomingSupTrips,
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
