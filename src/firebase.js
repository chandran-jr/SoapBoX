import firebase  from "firebase";

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyDdMyMZbpgejdPomTG2HJiebP1pDWrbybk",
    authDomain: "instagram-clone-react-e1309.firebaseapp.com",
    projectId: "instagram-clone-react-e1309",
    storageBucket: "instagram-clone-react-e1309.appspot.com",
    messagingSenderId: "543573824056",
    appId: "1:543573824056:web:b46455b4800bfa96108ccd",
    measurementId: "G-14867TFB6Q"


});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


  export {db, auth, storage}; 