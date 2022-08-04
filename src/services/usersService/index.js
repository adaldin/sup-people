import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";

export async function getUserName(userEmail) {
  let user = {};
  try {
    const users = query(collection(db, "users"));
    user = query(users, where("email", "==", user));
    console.log(user.data().fname);
  } catch (err) {
    console.log("Firestore error: ", err);
    return "";
  }
  return user.data().fname;
}
