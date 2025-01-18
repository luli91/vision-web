import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

//auth provider
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Registrar un usuario
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    // Login usuario
    const loginUser = async (email, password) =>{
        return await signInWithEmailAndPassword(auth, email, password)
    }

    //registrarse cn google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    //logout usuario
    const logout = () => {
        return signOut(auth)
    }

    //manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            
            if(user) {
                const{email,displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                }
            }
          })

          return () => unsubscribe;
    }, [])

    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
