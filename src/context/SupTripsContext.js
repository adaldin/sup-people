import { createContext, useReducer, useContext } from "react";
import supTripReducer, { initialState } from "./supTripReducer";
import {
  getSuptripsByAtendees,
  getSuptripsByCreators,
} from "../services/APIService";

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

  // const addActiveUsers = (uid) => {
  //   let user = {};
  //   let updatedUsers=[]
  //   const currentUsers = state.users;
  //   if (!currentUsers.includes(uid)) {
  //     const uid = uid;
  //     const nextTrips = getSuptripsByAtendees(state.supTrips, uid);
  //     const createdTrips = getSuptripsByCreators(state.supTrips, uid);
  //     user = { uid, nextTrips, createdTrips };
  //     updatedUsers=state.users.push(user)
  //   } else {
  //     const nextTrips = getSuptripsByAtendees(state.supTrips, uid);
  //     const createdTrips = getSuptripsByCreators(state.supTrips, uid);

  //   }

  // };

  const addSupTrip = (supTrip) => {
    const updatedSupTrips = state.supTrips.concat(supTrip);
    // const updatedUsers=state.users.find(uid)=>{
    //aquí debo obtener el obj uder (uid) si existe, y añadirle
    // los nuevos trips
    // }
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
