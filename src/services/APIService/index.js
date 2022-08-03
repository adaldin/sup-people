import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export async function getTodaySupTrips() {
  let dateToday = new Date()
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(",")[0];

  let todayTrips = [];

  try {
    const trips = query(
      collection(db, "supTrips"),
      where("supTripDate", "==", dateToday)
    );
    const querySnapshot = await getDocs(trips);
    querySnapshot.forEach((doc) => {
      let newTrip = { ...doc.data(), id: doc.id };
      todayTrips.push(newTrip);
    });
  } catch (err) {
    console.log("Firestore error: ", err);
    return [];
  }
  return todayTrips;
}

export async function updateTrips(trip) {
  try {
    const docRef = await addDoc(collection(db, "supTrips"), trip);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log("Firestore error: ", err);
    return [];
  }
}

export async function deleteTrip(trip) {
  try {
    const docRef = await deleteDoc(doc(db, "cities", trip.id));
  } catch (err) {
    console.log("Firestore error: ", err);
    return [];
  }
}
