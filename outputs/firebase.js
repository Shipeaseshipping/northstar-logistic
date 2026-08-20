import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js";
import { firebaseConfig } from "./firebase-config.js";
export const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app), functions=getFunctions(app);
export { onAuthStateChanged, signInWithEmailAndPassword, signOut, doc, getDoc, httpsCallable };
export async function roleOf(user){ if(!user)return null; return (await user.getIdTokenResult()).claims.role||null; }
