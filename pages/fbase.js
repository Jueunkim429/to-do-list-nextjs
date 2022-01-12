import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAcpCnMDa5rJfh82tsESyx6dEt2vkXn658",
    authDomain: "to-do-list-nextjs.firebaseapp.com",
    projectId: "to-do-list-nextjs",
    storageBucket: "to-do-list-nextjs.appspot.com",
    messagingSenderId: "807456410494",
    appId: "1:807456410494:web:1df86e6866e40efd88c12f"
  };

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();

export const firebaseInstance = firebase;
export const dbService = firebase.firestore();

