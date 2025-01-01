// authService.ts

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError
import { auth } from "./firebase";

// Fungsi untuk login menggunakan email dan password
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, // Menggunakan auth yang telah diekspor
      email,
      password
    );
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during login");
  }
};

// Fungsi untuk signup (registrasi) pengguna baru
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, // Menggunakan auth yang telah diekspor
      email,
      password
    );
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during sign up");
  }
};

// Fungsi untuk logout pengguna
export const logout = async () => {
  try {
    await signOut(auth); // Menggunakan auth yang telah diekspor
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during logout");
  }
};

// Fungsi untuk memantau status otentikasi pengguna
export const onAuthStateChangedListener = (callback: (user: any) => void) => {
  onAuthStateChanged(auth, callback); // Callback akan dipanggil saat status autentikasi berubah
};
