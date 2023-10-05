import {
	auth,
	deleteObject,
	getDownloadURL,
	listAll,
	onAuthStateChanged,
	ref,
	signOut,
	storage,
	uploadBytesResumable,
} from "./app.js";

onAuthStateChanged(auth, (user) => {
	if (!user) {
		location.href = "http://127.0.0.1:5500/login.html";
	}
});

const imageForm = document.querySelector("#image-form");
const logOut = document.querySelector("#log-out");
const renderMarriageList = document.querySelector("#marriage-list");
const renderPartyList = document.querySelector("#party-list");
const renderOtherList = document.querySelector("#other-list");

async function getArr(imageRef) {
	return await getDownloadURL(imageRef);
}

async function getData(category, render) {
	const recordArr = [];
	const imageRef = ref(storage, category);

	const res = await listAll(imageRef);
	const items = res.items.map((itemRef) => itemRef._location.path_);
	for (let path of items) {
		const imageRef = ref(storage, path);
		let url = await getArr(imageRef);
		recordArr.push({ url, path });
	}

	const div = document.createElement("div");
	div.classList.add("record");
	div.innerHTML = recordArr.map((obj) => {
		let id = obj.path;
		// console.log(id);
		return `
    <div><img src=${obj.url}/></div>
    <button class="delete" data-id="${obj.path}">Delete</button>
    `;
	});
	render.appendChild(div);
}
getData("marriage", renderMarriageList);
getData("party", renderPartyList);
getData("other", renderOtherList);

function deleteImage(e) {
	e.stopPropagation();
	let name = e.target.dataset.id;
	// Delete the file
	const desertRef = ref(storage, `${name}`);
	deleteObject(desertRef)
		.then(() => {
			location.reload();
		})
		.catch((error) => {});
}

renderMarriageList.addEventListener("click", deleteImage);
renderPartyList.addEventListener("click", deleteImage);
renderOtherList.addEventListener("click", deleteImage);

logOut.addEventListener("click", () => {
	// console.log("clicked");
	signOut(auth)
		.then(() => {
			location.href = "http://127.0.0.1:5500/login.html";
		})
		.catch((error) => {});
});

imageForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let category = e.target[0].value;
	const imageFile = e.target[1].files[0];
	const imageName = category + "-" + new Date() + "-" + imageFile.name;

	const metadata = {
		contentType: imageFile.type,
	};

	const storageRef = ref(storage, `${category}/` + imageName);
	const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress =
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log("Upload is " + progress + "% done");
			switch (snapshot.state) {
				case "paused":
					console.log("Upload is paused");
					break;
				case "running":
					console.log("Upload is running");
					break;
			}
		},
		(error) => {
			switch (error.code) {
				case "storage/unauthorized":
					break;
				case "storage/canceled":
					break;
				case "storage/unknown":
					break;
			}
		},
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				location.reload();
				// getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				// 	console.log("File available at", downloadURL);
			});
		}
	);
});
