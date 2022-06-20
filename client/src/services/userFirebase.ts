import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useContext } from 'react';
import { auth } from "../firebase/client";



export const userRegister = async (email:string,password:string) => {
    const user = await createUserWithEmailAndPassword(auth,email,password);
        await sendEmailVerification(user.user)
    // return user.user
    }   

export const userLogin = (email:string,password:string) =>
    signInWithEmailAndPassword(auth,email,password)

export const userSingOut = () => signOut(auth)

export const userData = () => onAuthStateChanged(auth,user => user)


// export const userUpdate = (userName:string ,photoURL:string ) => updateProfile(auth.currentUser,{ displayName: userName, photoURL: photoURL })



