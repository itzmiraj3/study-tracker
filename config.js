// Firebase config: copied from Firebase Console > Project settings > Your apps.
// This is a public web config, so it is fine to be in the page. Security comes from Firebase Auth and Security Rules.
const firebaseConfig = {
  apiKey: "AIzaSyAWYBLDGs9dvFb430Pz-pwWv8YUd5Ydm-4",
  authDomain: "study-timer-70225.firebaseapp.com",
  projectId: "study-timer-70225",
  storageBucket: "study-timer-70225.firebasestorage.app",
  messagingSenderId: "417617338866",
  appId: "1:417617338866:web:6404431e668be5a4b20b6b",
  measurementId: "G-51C6JV17CT"
};
firebase.initializeApp(firebaseConfig);
const fbAuth = firebase.auth();
// Firestore keeps the study data of cloud accounts. Offline changes are queued and sent when the connection returns.
const fbDb = firebase.firestore();
fbDb.enablePersistence({ synchronizeTabs: true }).catch(function(){});
/* The service worker is registered on every page load (even before sign-in), so the app can be installed and notifications have a worker. */
if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(function(){}); }
