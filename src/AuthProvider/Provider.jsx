import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase.init';

export const AuthContext = createContext();

const Provider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();
    const [email, setEmail] = useState('')
    const [rating, setRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0)



    // register

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)


    }

    // sign in

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)


    }

    // sign in with google

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)

    }


    // signOut

    const logOut = () => {
        setLoading(true);
        return signOut(auth)


    }


    useEffect(() => {


        const unSubscribe = onAuthStateChanged(auth, curentUser => {
            if (curentUser) {
                setUser(curentUser);
                setLoading(false);
            } else {
                // console.log('No User LoggedIn')
            }


        })

        return () => {

            unSubscribe()
        }

    }, [])








    const authInfo = {
        register,
        signIn,
        loading,
        setUser,
        user,
        logOut,
        setRatingCount,
        ratingCount,
        setRating,
        email,
        setEmail,
        rating,
        googleSignIn




    };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;

























