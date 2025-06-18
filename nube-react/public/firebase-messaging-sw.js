// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDvZFhlBox5WiTvh623qWavX1IOBJfQBac",
  authDomain: "desarrollo-nube-2025.firebaseapp.com",
  projectId: "desarrollo-nube-2025",
  storageBucket: "desarrollo-nube-2025.firebasestorage.app",
  messagingSenderId: "271999023910",
  appId: "1:271999023910:web:df111b550544409351dfe7",
  measurementId: "G-JTG8HG4SB5",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
});