import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAQFonCVYJeKeTsjvSdemGm7dfTRS2laVk",
    authDomain: "todo-app-6476f.firebaseapp.com",
    projectId: "todo-app-6476f",
    storageBucket: "todo-app-6476f.appspot.com",
    messagingSenderId: "271313473651",
    appId: "1:271313473651:web:f77e43667a751184dd1a06"
  };

  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;