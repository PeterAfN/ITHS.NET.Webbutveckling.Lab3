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
            this.save()
                .then()
                .catch((err) => console.log(err));
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
        const categoryInput = document.querySelector('#category');
        const lengthInput = document.querySelector('#length');
        const typeInput = document.querySelector('#type');
        const priceInput = document.querySelector('#price');

        let course = {
            // id: Number(idInput.value),
            id: Number(Number(data[data.length - 1].id) + 1),
            title: titleInput.value,
            description: descriptionInput.value,
            length: Number(lengthInput.value),
            category: categoryInput.value,
            type: typeInput.value,
            price: priceInput.value,
        };

        const response = await fetch(`${this.baseUrl}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        });

        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }

    toggle() {
        const modalAdd = document.querySelector(".modal-add");
        modalAdd.classList.toggle("closed-add");
        modalOverlayAdd.classList.toggle("close-overlay-add");
    }
}