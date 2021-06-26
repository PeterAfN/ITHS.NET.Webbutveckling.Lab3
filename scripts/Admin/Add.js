"use strict";

class Add {

    constructor(baseUrl) {
        this.modalOverlayAdd = document.querySelector(".modal-overlay-add");

        this.baseUrl = baseUrl;
        this.addEventListeners();
    }

    addEventListeners() {
        const addButton = document.querySelector(".add-course-btn")
        const saveButton = document.querySelector(".modal-add #save");
        const cancelButton = document.querySelector(".modal-add #cancel");
        const closeButtonAdd = document.querySelector(".modal-add #close-button-add");

        addButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.toggle();
        });
        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.save();
            this.toggle();
        });
        cancelButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.toggle();
        });
        closeButtonAdd.addEventListener("click", () => {
            this.toggle();
        });
    }

    async save() {
        const idInput = document.querySelector('#add-container #id');
        const titleInput = document.querySelector('#add-container #title');
        const descriptionInput = document.querySelector('#add-container #description');
        const lengthInput = document.querySelector('#add-container #length');
        const difficultyInput = document.querySelector('#add-container #difficulty');
        const priceInput = document.querySelector('#add-container #price');
        const statusInput = document.querySelector('#add-container #status');

        let course = {
            id: Number(idInput.value),
            titel: titleInput.value,
            description: descriptionInput.value,
            length: Number(lengthInput.value),
            difficulty: difficultyInput.value,
            status: statusInput.value,
            price: Number(priceInput.value),
        };

        await fetch(`${this.baseUrl}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        })
            .then(function (text) {
                switch (text.status) {
                    case 500:
                        console.log("Kursen kunde inte sparas! Kontrollera så att kursnumret inte används redan! ", "felkod: " + text.status);
                        break;
                    case 201:
                        console.log("Kursen sparades korrekt!");
                        break;
                    default:
                        break;
                }
            })
            .catch(function (error) {
                console.log('Kursen kunde inte sparas! Har fälten rätt värden?', error);
            });
    }

    toggle() {
        const modalAdd = document.querySelector(".modal-add");
        modalAdd.classList.toggle("closed-add");
        this.modalOverlayAdd.classList.toggle("close-overlay-add");
    }
}