import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "@/firebase/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import type { User } from "firebase/auth";

import type { AuthContextType } from "@/types/auth.types";
import type { AuthProviderProps } from "@/types/properties.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  } else {
    return context;
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    function initializaUser(user: User | null) {
        if (user) {
            setCurrentUser(user)
            setUserLoggedIn(true)
        } else {
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setLoading(false)
    }

    async function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    async function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    async function logout() {
        return signOut(auth)
    }

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializaUser)
        return unsubscribe
    }, [])

    const value: AuthContextType = {
        currentUser,
        userLoggedIn,
        loading,
        login,
        signup,
        logout,
        loginWithGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

