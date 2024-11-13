// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCs-FKUdw_JI0NgCZkM3eUtXwAWhVRjSmE",
  authDomain: "ravensnlp.firebaseapp.com",
  projectId: "ravensnlp",
  storageBucket: "ravensnlp.firebasestorage.app", 
  messagingSenderId: "1018658899641",
  appId: "1:1018658899641:web:93ffce740fc5f41a687d68",
  measurementId: "G-TG2QZ6JL0M"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
