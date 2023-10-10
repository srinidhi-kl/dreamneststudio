import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
	signOut,
	getAuth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
	listAll,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

export {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	deleteObject,
	listAll,
};

const firebaseConfig = {
	apiKey: "AIzaSyDZnprJR8_r5EqFQvmbD8hEcrpq2WTIkKA",
	authDomain: "image-e615b.firebaseapp.com",
	projectId: "image-e615b",
	storageBucket: "image-e615b.appspot.com",
	messagingSenderId: "139210719286",
	appId: "1:139210719286:web:695dbb901aa3e08e079897",
	measurementId: "G-YHP352FDZ4",
};

export const firebaseAapp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseAapp);
export const auth = getAuth();