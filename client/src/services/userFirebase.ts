import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useContext } from 'react';
import { auth } from "../firebase/client";
import { getAuth } from 'firebase/auth';



export const userRegister = async (email:string,password:string) => {
    const user = await createUserWithEmailAndPassword(auth,email,password);
    return user;
    //await sendEmailVerification(user.user)
    // return user.user
    }   

export const userLogin = (email:string,password:string) =>
    signInWithEmailAndPassword(auth,email,password)

export const userSingOut = () => signOut(auth)


export function userData(){
    const user = auth.currentUser;
    if(user){
        const uid = user.uid;
        return uid;
    }
}


// export const userData = () => onAuthStateChanged(auth, user => {
//     if(user) {
//         const uid = user.uid;
//         return uid;
//     }
// })


// export const userUpdate = (userName:string ,photoURL:string ) => updateProfile(auth.currentUser,{ displayName: userName, photoURL: photoURL })



