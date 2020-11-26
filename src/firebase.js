import firebase from "firebase";

<script defer src="./firebase.js"></script>

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp = ({
  apiKey: "AIzaSyAP4zF5GZRYQc0I6ew0e1MGOWknBpvmQyo",
  authDomain: "instagram-clone-react-bdf3e.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-bdf3e.firebaseio.com",
  projectId: "instagram-clone-react-bdf3e",
  storageBucket: "instagram-clone-react-bdf3e.appspot.com",
  messagingSenderId: "241396013821",
  appId: "1:241396013821:web:c1e228b224b88c2b277c94",
  measurementId: "G-QDTTEVBZYV"
});



const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };