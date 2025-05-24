const petType = document.getElementById("petType");
const formEl = document.querySelector("form");
const petArr = [];

const petBreeds = {
	Dog: ["Labrador", "Golden Retriever", "Beagle", "Poodle", "Bulldog"],
	Cat: ["Bengal", "Siamese", "Persian", "Sphynx", "Rgadoll"],
};

const changePetType = () => {
	const petBreed = document.getElementById("petBreed");
	petBreed.innerHTML = "";

	const breeds = petBreeds[petType.value];
	if (breeds) {
		for (const breed of breeds) {
			const option = document.createElement("option");
			option.value = breed;
			option.innerHTML = breed;
			petBreed.appendChild(option);
		}
	} else {
		console.warn("Invalid pet type" + petType.value);
	}
};

class Pet {
	constructor(name, birth, petType, petBreed) {
		this.name = name;
		this.birth = birth;
		this.petType = petType;
		this.petBreed = petBreed;
	}
	generateTable() {
		const row = document.createElement("tr");
		row.innerHTML = `<td>${this.name}</td>`;
		row.innerHTML += `<td>${this.birth}</td>`;
		row.innerHTML += `<td>${this.petType}</td>`;
		row.innerHTML += `<td>${this.petBreed}</td>`;
		return row;
	}
}
const addData = (e) => {
	e.preventDefault();
	const formData = new FormData(formEl);

	const name = formData.get("name");
	const birth = formData.get("birth");
	const petType = formData.get("petType");
	const petBreed = formData.get("petBreed");

	const pet = new Pet(name, birth, petType, petBreed);

	petArr.push(pet);
	reviseTable();
	if (petArr.length > 0) {
		const dividerEl = document.querySelector(".divider");
		const sectionEl = document.querySelector(".section--table");
		dividerEl.classList.remove("visually-hidden");
		sectionEl.classList.remove("visually-hidden");
	}
	formEl.reset();
};

const reviseTable = () => {
	const petTableBody = document.getElementById("petTableBody");
	petTableBody.innerHTML = "";

	for (const pet of petArr) {
		petTableBody.appendChild(pet.generateTable());
	}
};

petType.addEventListener("change", changePetType);
formEl.addEventListener("submit", addData);
