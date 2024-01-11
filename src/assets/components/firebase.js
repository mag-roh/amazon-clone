// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC9YXIanOPe1OJAxoJWhGXLFqaovvnMsGw",
  authDomain: "clone-c9b22.firebaseapp.com",
  projectId: "clone-c9b22",
  storageBucket: "clone-c9b22.appspot.com",
  messagingSenderId: "142317964622",
  appId: "1:142317964622:web:8a947eb324486e1b03e21f",
  measurementId: "G-5CWLTDNTS0",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};