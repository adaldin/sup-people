import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  addDoc,
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

export async function addSupTriptoDB(supTrip) {
  try {
    const docRef = await addDoc(collection(db, "supTrips"), supTrip);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log("Firestore error: ", err);
  }
}

export async function updateTrips(trip) {
  try {
    const docRef = await setDoc(doc(db, "supTrips", trip.id), trip);
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

export function getSuptripsByAtendees(suptrips, uid) {
  const userSuptrips = suptrips.filter((suptrip) => {
    return suptrip.atendees.includes(uid) && suptrip.createdBy !== uid;
  });
  return userSuptrips;
}
