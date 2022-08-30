import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export async function getSupTrips() {
  let totalSupTrips = [];

  try {
    const trips = query(collection(db, "supTrips"));
    const querySnapshot = await getDocs(trips);
    querySnapshot.forEach((doc) => {
      let newTrip = { ...doc.data(), id: doc.id };
      totalSupTrips.push(newTrip);
    });
  } catch (err) {
    console.log("Firestore error: ", err);
    return [];
  }
  return totalSupTrips;
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
    console.log("Document deleted: ", docRef);
  } catch (err) {
    console.log("Firestore error: ", err);
    return [];
  }
}

export function getSuptripsByUser(suptrips, uid) {
  const userSuptrips = suptrips.filter((suptrip) =>
    suptrip.atendees.includes(uid)
  );
  return userSuptrips;
}
