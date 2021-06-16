"use strict";



//Add.js is opened from the ShoppingCartBar.js navigation bar and adds new courses to the REST.API.
class Add {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.addEventListeners();
    }

    addEventListeners() {
        const addButton = document.querySelector("#add-button");
        const saveButton = document.querySelector("#save");
        const cancelButton = document.querySelector("#cancel");
        const closeButtonAdd = document.querySelector("#close-button-add");

        addButton.addEventListener("click", () => {
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
        const idInput = document.querySelector('#id');
        const titleInput = document.querySelector('#title');
        const descriptionInput = document.querySelector('#description');
        const lengthInput = document.querySelector('#length');
        const difficultyInput = document.querySelector('#difficulty');
        const priceInput = document.querySelector('#price');
        const statusInput = document.querySelector('#status');

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

        // if (!response.ok) throw new Error(response.statusText);
        // return response.json();
    }

    toggle() {
        const modalAdd = document.querySelector(".modal-add");
        modalAdd.classList.toggle("closed-add");
        modalOverlayAdd.classList.toggle("close-overlay-add");
    }
}