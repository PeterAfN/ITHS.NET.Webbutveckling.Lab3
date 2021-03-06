"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    let address = new Address();
});

class Address {

    constructor() {
        let isUserRegistered = (localStorage.getItem("WestcoastEducation_IsUserRegistered") === "true");
        if (isUserRegistered) {
            this.get();
            this.addEventListeners();

            this.id = -1;
            this.firstname = document.querySelector('#address-firstname');
            this.lastname = document.querySelector('#address-lastname');
            this.street = document.querySelector('#address-street');
            this.city = document.querySelector('#address-city');
            this.stateprovince = document.querySelector('#address-stateprovince');
            this.postalcode = document.querySelector('#address-postalcode');
            this.country = document.querySelector('#address-country');
            this.email = document.querySelector('#address-email');
            this.mobile = document.querySelector('#address-mobile');
        }
    }

    addEventListeners() {
        let searcString = "#address-container #save";
        const saveButton = document.querySelector(searcString);
        saveButton.addEventListener("click", () => {
            this.saveToAPI(this.id);
        });
    }

    get() {

        let mail = localStorage.getItem("WestcoastEducation_RegisteredEmail");
        this.readFromAPI(mail).then(student => {
            let address = Object.values(student)[0];
            this.toHtml(address);
        });
    }

    async readFromAPI(mail) {
        let url = `https://localhost:5001/api/student/find/${mail}`;
        return fetch(url)
            .then(student => {
                if (student.ok) {
                    return student.json().then(student => ({ student }));
                }
                console.log("error reading student from database");
            });
    }

    toHtml(address) {
        this.id = Number(address.id);
        this.firstname.value = address.firstName;
        this.lastname.value = address.lastName;
        this.street.value = address.address;
        this.city.value = address.city;
        this.stateprovince.value = address.stateProvince;
        this.postalcode.value = Number(address.postalCode);
        this.country.value = address.country;
        this.email.value = address.mail;
        this.mobile.value = address.mobile;
    }

    async saveToAPI(id) {
        let _this = this;
        let student = {
            firstName: this.firstname.value,
            lastName: this.lastname.value,
            address: this.street.value,
            city: this.city.value,
            stateProvince: this.stateprovince.value,
            postalCode: Number(this.postalcode.value),
            country: this.country.value,
            mail: this.email.value,
            mobile: this.mobile.value,
        };

        let url = `https://localhost:5001/api/student/${id}`;
        await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        })
            .then(function (text) {
                switch (text.status) {
                    case 400:
                    case 500:
                        console.log("Adressen kunde inte sparas! Kontrollera s?? att adressuppgifterna ??r korrekt ifyllda! ", "felkod: " + text.status);
                        break;
                    case 204:
                        localStorage.setItem("WestcoastEducation_RegisteredEmail", student.mail);
                        console.log("Adressen sparades korrekt!");
                        break;
                    default:
                        console.log("Adressen kunde inte sparas! Ok??nt fel! ", "felkod: " + text.status);
                        _this.get();
                        break;
                }
            })
            .catch(function (error) {
                _this.get();
                console.log('Ett ok??nt fel uppstod n??r adressen skulle sparas', error);
            });
    }
}