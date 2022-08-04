export const initialState = {
  supTrips: [],
};

const supTripsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INIT":
      console.log("INIT", payload);
      return { supTrips: payload.supTrips };
    case "ADD_TRIP":
      console.log("ADD_TRIP", payload);
      return { ...state, supTrips: payload.supTrips };
    case "REMOVE_TRIP":
      console.log("REMOVE_TRIP", payload);
      return { ...state, supTrips: payload.supTrips };
    case "UPDATE_TRIP":
      console.log("UPDATE_TRIP", payload);
      return { ...state, supTrips: payload.supTrips };
    default:
      throw new Error(`No case for type ${type}`);
  }
};
export default supTripsReducer;
