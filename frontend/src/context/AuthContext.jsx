import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (data) => {
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL || null,
      });
      setCurrentUser({ ...currentUser, displayName: data.displayName, photoURL: data.photoURL || null });
    }
  };

  const updateUserPassword = async (oldPassword, newPassword) => {
    if (currentUser && oldPassword && newPassword) {
      const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
      try {
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
      } catch (error) {
        console.error("Reauthentication failed:", error.message);
        throw new Error("Reauthentication failed");
      }
    } else {
      throw new Error("Both old and new passwords are required");
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
    updateUserProfile,
    updateUserPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
