import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "./app.js";

const loginForm = document.querySelector("#login-form");

onAuthStateChanged(auth, (user) => {
	if (user) {
		location.href = "http://127.0.0.1:5500/upload.html";
	}
});

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let email = e.target[0].value;
	let password = e.target[1].value;

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			location.href = "http://127.0.0.1:5500/upload.html";
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
	console.log(email, password);
});
