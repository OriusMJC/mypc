import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail,
	updateEmail,
} from "firebase/auth";
import { emailUpdateUser, loginUser } from "src/redux/actions";
// import { createContext, useContext } from 'react';
import { auth } from "../firebase/client";
// import { getAuth } from 'firebase/auth';

export const userRegister = async (email: string, password: string) => {
	const user = await createUserWithEmailAndPassword(auth, email, password);
	await sendEmailVerification(user.user);
	return user;
};

export const userLogin = async (email: string, password: string) => {
	await signInWithEmailAndPassword(auth, email, password);
	let user = window.localStorage.getItem("userData");
	if (!user) {
		window.localStorage.setItem(
			"userData",
			JSON.stringify({ email, password })
		);
	}
};

export const userSingOut = async () => {
	await signOut(auth);
	window.localStorage.removeItem("userData");
};

export const userData = async () => {
	const user = auth.currentUser;
	if (user) {
		const uid = user.uid;
		return uid;
	}
};

export const loginVerifycation = async (dispatch: any) => {
	let user = await JSON.parse(window.localStorage.getItem("userData"));
	if (user && !user.id) {
		await userLogin(user.email, user.password);
		const id = await userData();
		if (id) {
			dispatch(loginUser(id));
		}
	} else if (user?.id) {
		dispatch(loginUser(user.id));
	}
};

// export const userData = () => onAuthStateChanged(auth, user => {
//     if(user) {
//         const uid = user.uid;
//         return uid;
//     }
// })

// export const userUpdate = (userName:string ,photoURL:string ) => updateProfile(auth.currentUser,{ displayName: userName, photoURL: photoURL })

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	let response = await signInWithPopup(auth, provider);
	const { email, uid } = response.user;
	let user = window.localStorage.getItem("userData");
	if (!user) {
		window.localStorage.setItem(
			"userData",
			JSON.stringify({ id: uid, email, password: "1234567" })
		);
	}
	return response.user;
};
export const updatePasswordUser = async (email: string) => {
	await sendPasswordResetEmail(auth, email)
		.then(async (response) => {
			alert("email send");
		})
		.catch((err) => console.log(err.code, err.message));
};
export const updateEmailUser = async (id: string, newEmail: string, dispatch: any) => {
	let user = auth.currentUser;
	await updateEmail(user, newEmail)
		.then(async (response) => {
			alert("email change");
			dispatch(emailUpdateUser(id, newEmail))
			dispatch(loginUser(id))
			window.localStorage.setItem(
				"userData",
				JSON.stringify({ id, email:newEmail })
			);
		})
		.catch((err) => console.log(err));
};
