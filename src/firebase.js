import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCbAiSiafxLQc_FSsK54SLGE1EhDjF4K8A",
    authDomain: "itmediav2.firebaseapp.com",
    projectId: "itmediav2",
    storageBucket: "itmediav2.appspot.com",
    messagingSenderId: "137889329690",
    appId: "1:137889329690:web:0f698a09b8b0dac2f797a3",
    measurementId: "G-TEWBFMFHTE"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };