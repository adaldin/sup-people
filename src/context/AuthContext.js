// React
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Context
export const authContext = createContext();

// Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
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
    <authContext.Provider value={{ signUp, login, user, logout, loading }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;

// useContext Hook
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};
