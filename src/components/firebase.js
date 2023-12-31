import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAEJFg607uWlmI3Lq8EkKShaggQM4ukfHc",
  authDomain: "clone-98611.firebaseapp.com",
  projectId: "clone-98611",
  storageBucket: "clone-98611.appspot.com",
  messagingSenderId: "439750156387",
  appId: "1:439750156387:web:e521b2f6d5f7563db19856",
  measurementId: "G-2L4076CK9V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

const auth = firebase.auth();

export { database, auth };