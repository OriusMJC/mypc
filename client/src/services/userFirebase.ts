import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { loginUser } from "src/redux/actions";
// import { createContext, useContext } from 'react';
import { auth } from "../firebase/client";
// import { getAuth } from 'firebase/auth';



export const userRegister = async (email:string,password:string) => {
    const user = await createUserWithEmailAndPassword(auth,email,password);
    await sendEmailVerification(user.user)
    return user;
    }   
    
export const userLogin = async (email:string,password:string) => {
    await signInWithEmailAndPassword(auth,email,password)
    let user = window.localStorage.getItem('userData')
    if(!user){
        window.localStorage.setItem('userData', JSON.stringify({email, password}))
    }
}


export const userSingOut = async() => {
    await signOut(auth)
    window.localStorage.removeItem('userData')
}


export const userData= async ()=>{
    const user = auth.currentUser;
    if(user){
        const uid = user.uid;
        return uid;
    }
}

export const loginVerifycation = async (dispatch:any)=>{
    let user = await JSON.parse(window.localStorage.getItem('userData'))
    if(user.email){
        await userLogin(user.email,user.password)
        const id = await userData();
        console.log(id)
        dispatch(loginUser(id));
   }
}


// export const userData = () => onAuthStateChanged(auth, user => {
//     if(user) {
//         const uid = user.uid;
//         return uid;
//     }
// })


// export const userUpdate = (userName:string ,photoURL:string ) => updateProfile(auth.currentUser,{ displayName: userName, photoURL: photoURL })



