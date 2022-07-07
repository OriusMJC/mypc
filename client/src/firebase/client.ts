
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
    //     apiKey: "AIzaSyAohLh4JqkOfaIXpBchvuWrLWPa-p6X4ic",
    //     authDomain: "mypc-98326.firebaseapp.com",
    //     projectId: "mypc-98326",
    //     storageBucket: "mypc-98326.appspot.com",
    //     messagingSenderId: "380694699028",
    //     appId: "1:380694699028:web:2c0e81c60451a1e7cb5b01",
    //     measurementId: "G-2VNB6H460D"
    //   };
    
    
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAohLh4JqkOfaIXpBchvuWrLWPa-p6X4ic",
  authDomain: "mypc-98326.firebaseapp.com",
  projectId: "mypc-98326",
  databaseURL: "https://mypc-98326-default-rtdb.firebaseio.com",
  storageBucket: "mypc-98326.appspot.com",
  messagingSenderId: "380694699028",
  appId: "1:380694699028:web:2c0e81c60451a1e7cb5b01",
  measurementId: "G-2VNB6H460D"
};


const app = initializeApp(firebaseConfig);
// databa
export const auth = getAuth(app)
export const db = getDatabase(app)
// console.log(db)

// const analytics = getAnalytics(app);



