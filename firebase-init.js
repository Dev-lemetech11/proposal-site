// firebase-init.js
// Shared Firebase initialization for the whole site.
// Every page that needs to log an event imports `db` from here.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAoRkfPDLXK2qi19AebBYfi88rIu5CPo00",
    authDomain: "my-proposal-site-cd094.firebaseapp.com",
    projectId: "my-proposal-site-cd094",
    storageBucket: "my-proposal-site-cd094.firebasestorage.app",
    messagingSenderId: "515787254393",
    appId: "1:515787254393:web:a6332d001eef19409d02a8",
    measurementId: "G-XCND5F1JRN"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);