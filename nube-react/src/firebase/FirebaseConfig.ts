import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDvZFhlBox5WiTvh623qWavX1IOBJfQBac",
  authDomain: "desarrollo-nube-2025.firebaseapp.com",
  projectId: "desarrollo-nube-2025",
  storageBucket: "desarrollo-nube-2025.firebasestorage.app",
  messagingSenderId: "271999023910",
  appId: "1:271999023910:web:df111b550544409351dfe7",
  measurementId: "G-JTG8HG4SB5",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAnalytics = getAnalytics(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);
const firebaseUi = new firebaseui.auth.AuthUI(firebaseAuth);
const firebaseDb = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);
const firebaseMessaging = getMessaging(firebaseApp);
const firebaseFunctions = getFunctions(firebaseApp);

firebaseAuth.useDeviceLanguage();
export {
  firebaseApp,
  firebaseAnalytics,
  firebaseUi,
  firebaseDb,
  firebaseStorage,
  firebaseAuth,
  firebaseMessaging,
  firebaseFunctions,
};
