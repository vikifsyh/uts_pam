// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwrkZ7GHQI-CI74r3L1ixuZqDWlnm17zk",
  authDomain: "pam-uas-fc8c5.firebaseapp.com",
  projectId: "pam-uas-fc8c5",
  storageBucket: "pam-uas-fc8c5.firebasestorage.app",
  messagingSenderId: "988802120695",
  appId: "1:988802120695:web:b75465aeda7bd08e260cf2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Ekspor auth agar bisa digunakan di tempat lain

// Fungsi untuk mendengarkan perubahan status otentikasi pengguna
export const authListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
