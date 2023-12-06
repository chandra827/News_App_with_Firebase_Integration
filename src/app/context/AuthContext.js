'use client'


import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from '../Firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authData, setAuthData] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedAuthData = localStorage.getItem('authData');
            return storedAuthData ? JSON.parse(storedAuthData) : null;
        }
        return null;
    });

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        try {
            signInWithPopup(auth, provider);
            
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    const logOut = () => {
        signOut(auth);
        setAuthData(null);
    };

    const updateAuthData = (newAuthData) => {
        setAuthData(newAuthData);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('authData', JSON.stringify(authData));
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [user, authData]);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut, authData, updateAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
