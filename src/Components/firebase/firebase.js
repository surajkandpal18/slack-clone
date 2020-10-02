import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBuzDHSAn9wkx8IKVbfPzxK0IiEfAanIis",
  authDomain: "slack-clone-sk8.firebaseapp.com",
  databaseURL: "https://slack-clone-sk8.firebaseio.com",
  projectId: "slack-clone-sk8",
  storageBucket: "slack-clone-sk8.appspot.com",
  messagingSenderId: "81383291506",
  appId: "1:81383291506:web:ca666d9ec38ccd062ea0eb",
  measurementId: "G-8TCSDETNC9",
};

const myfirebase = firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
export default db;
