"use strict";

class Edit {

    constructor() {
        this.modalOverlayEditCourse = document.querySelector(".modal-overlay-edit");
        this.idInput = document.querySelector('.modal-edit #id');
        this.titleInput = document.querySelector('.modal-edit #title');
        this.descriptionInput = document.querySelector('.modal-edit #description');
        this.lengthInput = document.querySelector('.modal-edit #length');
        this.difficultyInput = document.querySelector('.modal-edit #difficulty');
        this.priceInput = document.querySelector('.modal-edit #price');
        this.statusInput = document.querySelector('.modal-edit #active');

        this.addEventListeners();
    }

    addEventListeners() {
        let saveButton = document.querySelector(".modal-edit #save");
        let cancelButton = document.querySelector(".modal-edit #cancel");
        let closeButtonEdit = document.querySelector(".modal-edit #close-button-edit");

        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.save();
            this.toggle();
        });
        cancelButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.toggle();
        });
        closeButtonEdit.addEventListener("click", () => {
            this.toggle();
        });
        document.addEventListener("click", (e) => {
            if (e.target === this.modalOverlayEditCourse) {
                this.toggle();
            }
        });
    }

    addValuesToEditModal(selectedCourseId) {
        courses.getCourseFromAPI(selectedCourseId).then(course => {
            if (course !== undefined) {
                let c = Object.values(course)[0];
                this.idInput.value = c.id;
                this.idInput.disabled = true;
                this.titleInput.value = c.titel;
                this.descriptionInput.value = c.description;
                this.lengthInput.value = c.length;
                this.difficultyInput.value = c.difficulty;
                this.priceInput.value = c.price;

                if (c.status === "aktiv")
                    this.statusInput.checked = true;
                else this.statusInput.checked = false;
            }
        });
    }

    async save() {
        let course = {
            id: Number(this.idInput.value),
            titel: this.titleInput.value,
            description: this.descriptionInput.value,
            length: Number(this.lengthInput.value),
            difficulty: this.difficultyInput.value,
            status: (this.statusInput.checked ? "aktiv" : "pensionerad"),
            price: Number(this.priceInput.value),
        };
        await fetch(`https://localhost:5001/api/course/${Number(this.idInput.value)}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        })
            .then(function (text) {
                switch (text.status) {
                    case 400:
                    case 500:
                        console.log("Kursen kunde inte sparas! Kontrollera så att kursnumret inte används redan och att fälten har rätt nummer! ", "felkod: " + text.status);
                        break;
                    case 204:
                    case 201:
                        courses.handleSearchClick();
                        console.log("Kursen sparades korrekt!");
                        break;
                    default:
                        console.log(text.status);
                        break;
                }
            })
            .catch(function (error) {
                console.log('Kursen kunde inte sparas! Oväntat fel uppstod', error);
            });
    }

    toggle() {
        const modalAdd = document.querySelector(".modal-edit");
        modalAdd.classList.toggle("closed-edit");
        this.modalOverlayEditCourse.classList.toggle("close-overlay-edit");
    }
}
