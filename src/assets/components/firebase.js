// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt5yF46jqcYmgg3fZrXdlPnVll7wgVCs4",
  authDomain: "clone-c1171.firebaseapp.com",
  projectId: "clone-c1171",
  storageBucket: "clone-c1171.appspot.com",
  messagingSenderId: "1054462464683",
  appId: "1:1054462464683:web:f6279dbde5cec17ec19dee",
  measurementId: "G-BBRZ82LGWN",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};