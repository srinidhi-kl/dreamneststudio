import { auth, onAuthStateChanged } from "./app.js";

const goToDashboard = document.querySelector("#go-to-dashboard");
goToDashboard.addEventListener("click", () => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			location.href = "http://127.0.0.1:5500/upload.html";
		} else {
			location.href = "http://127.0.0.1:5500/login.html";
			console.log("User not logged in");
		}
	});
});
