// Import the functions you need from the SDKs you need

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZvpCl32D5Wn2S0sATOc9ijjxP0ukUnsg",
  authDomain: "firegram-cba55.firebaseapp.com",
  projectId: "firegram-cba55",
  storageBucket: "firegram-cba55.appspot.com",
  messagingSenderId: "853524241876",
  appId: "1:853524241876:web:2d42d0cf78baaabc488a41",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const projectStorage = getStorage(firebaseApp);
const projectFirestore = getFirestore(firebaseApp);
const timestamp = projectFirestore.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
