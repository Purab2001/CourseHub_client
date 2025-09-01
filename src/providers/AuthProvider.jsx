import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize providers
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // GitHub sign in
  const signInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // Get ID token for API calls
  const getIdToken = async () => {
    if (!auth.currentUser) return null;
    return auth.currentUser.getIdToken(/* forceRefresh = */ true);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch profile from backend to get the latest data (including photoURL)
          const token = await currentUser.getIdToken();
          const response = await axiosInstance.get("/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data?.user) {
            // Merge Firebase user with backend user data
            const mergedUser = {
              ...currentUser,
              ...response.data.user, // Backend data overrides firebase where needed (e.g., photoURL)
              photoURL: response.data.user.photoURL || currentUser.photoURL, // Prioritize backend photoURL
            };
            setUser(mergedUser);
          } else {
            setUser(currentUser); // Fallback to firebase user
          }
        } catch (error) {
          console.error("Failed to fetch user profile from backend", error);
          setUser(currentUser); // Fallback to firebase user on error
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const setUserProfile = (object) => {
    return updateProfile(auth.currentUser, object);
  };

  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const deleteUserFirebase = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  };

  const contextValue = {
    createUser,
    loginUser,
    signInWithGoogle,
    signInWithGithub,
    getIdToken,
    user,
    loading,
    setUserProfile,
    userLogOut,
    deleteUserFirebase,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
