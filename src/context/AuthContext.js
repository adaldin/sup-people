// React
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Context
export const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signUp(email, password, fName, lName) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (credential) => {
        if (credential && credential.user) {
          const userData = {
            email: email,
            password: password,
            fName: fName,
            lName: lName,
            uid: credential.user.uid,
          };
          writeUserData(userData);
        }
      })
      .catch((error) => console.log(error.message));
  }
  async function writeUserData(user) {
    try {
      const userId = user.uid;
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data exist:", docSnap.data());
      } else {
        await setDoc(doc(db, "users", user.uid), {
          user,
        });
      }
    } catch (err) {
      console.log(err);
    }

    // const userRef = doc(db, "users");
    // console.log(userRef);
    // userRef.setDoc(user);
    // // .catch((error) => {
    // //   console.log(error.message);
    // // });
  }

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ signUp, login, user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// useContext Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};
