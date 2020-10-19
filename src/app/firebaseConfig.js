import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQGjc9dVN7dNKj_-FoY10YtRlrcBEDy8U",
    authDomain: "psikotest-rumah-hijau.firebaseapp.com",
    databaseURL: "https://psikotest-rumah-hijau.firebaseio.com",
    projectId: "psikotest-rumah-hijau",
    storageBucket: "psikotest-rumah-hijau.appspot.com",
    messagingSenderId: "595853838007",
    appId: "1:595853838007:web:340795ffab15b986016f32",
    measurementId: "G-NTBLJG8KYN"
  };
  
  firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage();
  export  {
      storage, firebase as default
  }