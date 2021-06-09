class Register {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.addEventListeners();
    }

    addEventListeners() {
        const registerButton = document.querySelector("#register-button");
        const saveButton = document.querySelector(".modal-register #save");
        const cancelButton = document.querySelector(".modal-register #cancel");
        const closeButtonRegister = document.querySelector("#close-button-register");

        registerButton.addEventListener("click", () => {
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
        closeButtonRegister.addEventListener("click", () => {
            this.toggle();
        });
    }

    async save() {
        const firstName = document.querySelector('#first-name');
        const lastName = document.querySelector('#last-name');
        const email = document.querySelector('#email');
        const mobile = document.querySelector('#mobile');
        const address = document.querySelector('#address');
        const city = document.querySelector('#city');
        const stateProvince = document.querySelector('#state-province');
        const postalCode = document.querySelector('#postal-code');
        const country = document.querySelector('#country');

        const person = {
            förnamn: firstName.value,
            efternamn: lastName.value,
            epost: email.value,
            mobilnummer: mobile.value,
            adress: address.value,
            city: city.value,
            stateProvince: stateProvince.value,
            postalCode: Number(postalCode.value),
            country: country.value,
        };

        let response = null;

        response = await fetch(`${this.baseUrl}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    }

    toggle() {
        const modalRegister = document.querySelector(".modal-register");
        modalRegister.classList.toggle("closed-register");
        modalOverlayRegister.classList.toggle("close-overlay-register");
    }
}
