
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
            if (this.isUserRegistered() === "false") {
                this.toggle();
            }

        });
        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.save()
                .then()
                .catch((err) => {
                    console.log(err);
                    return;
                })
        });
        cancelButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.toggle();
        });
        closeButtonRegister.addEventListener("click", () => {
            this.toggle();
        });
    }

    isUserRegistered() {
        return localStorage.getItem("WestcoastEducation_IsUserRegistered");
    }

    async save() {
        const firstName = document.querySelector('#first-name');
        const lastName = document.querySelector('#last-name');
        const mail = document.querySelector('#email');
        const mobile = document.querySelector('#mobile');
        const address = document.querySelector('#address');
        const city = document.querySelector('#city');
        const stateProvince = document.querySelector('#state-province');
        const postalCode = document.querySelector('#postal-code');
        const country = document.querySelector('#country');

        const person = {
            firstName: firstName.value,
            lastName: lastName.value,
            mail: mail.value,
            mobile: mobile.value,
            address: address.value,
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
        if (response.status !== 201) throw new Error(response.statusText);
        else {
            localStorage.setItem("WestcoastEducation_IsUserRegistered", true);
            localStorage.setItem("WestcoastEducation_RegisteredEmail", person.mail);
            this.toggle();
        }
    }

    toggle() {
        const modalRegister = document.querySelector(".modal-register");
        modalRegister.classList.toggle("closed-register");
        modalOverlayRegister.classList.toggle("close-overlay-register");
    }
}
