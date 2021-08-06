import firebase from "firebase";
import { firebaseConfig } from "./key";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
