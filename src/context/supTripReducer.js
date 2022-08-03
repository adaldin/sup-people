export const initialState = {
  supTrips: [],
};

const supTripsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TRIP":
      console.log("ADD_TRIP", payload);
      return { ...state, supTrips: payload.supTrips };
    case "REMOVE_TRIP":
      console.log("REMOVE_TRIP", payload);
      return { ...state, supTrips: payload.supTrips };
    default:
      throw new Error(`No case for type ${type}`);
  }
};
export default supTripsReducer;
