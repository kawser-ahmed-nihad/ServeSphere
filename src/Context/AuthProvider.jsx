import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }



    const googleProvider = new GoogleAuthProvider();

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if(currentUser?.email){
                const userData = {email : currentUser.email}
                axios.post('https://a11-37fs.onrender.com/jwt',userData ,{
                    withCredentials : true
                })
                .then(res=>{
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error);
                })
            }
        });
        return () => unSubscribe();
    }, []);
    const userInfo = {
        createUser,
        loginUser,
        updateUser,
        user,
        setUser,
        logOut,
        loading,
        googleLogin
    };



    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
