import { useContext } from "react";
import PaddleTripsContext from "../context/PaddleTripsContext.js";
import { query, getDocs } from "firebase";

async function APIservice() {
  const { setPaddleTrips } = useContext(PaddleTripsContext);
  try {
    const q = query(collection(db, "supTrips"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPaddleTrips(doc);
    });
  } catch (err) {
    console.log("Firestore error: ", err);
  }
}

export default APIservice;
