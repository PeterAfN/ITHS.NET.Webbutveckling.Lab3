"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    console.log(event);
    address = new Address();
});

class Address {

    constructor() {
        this.getAddress();
        this.addEventListeners();
    }

    addEventListeners() {
        const clickShowPage = document.querySelector(".courses-icon-my-page");

        clickShowPage.addEventListener("click", () => {
            this.getAddress();
        });       
    }

    getAddress() {
        let mail = localStorage.getItem("WestcoastEducation_RegisteredEmail");

        courses.getStudent(mail).then(student => {
            let address = Object.values(student)[0];
            this.addAddressToHtml(address);
        });
    }

    addAddressToHtml(address) {
        const firstname = document.querySelector('#personal-firstname');
        const lastname = document.querySelector('#personal-lastname');
        const street = document.querySelector('#personal-street');
        const city = document.querySelector('#personal-city');
        const stateprovince = document.querySelector('#personal-stateprovince');
        const postalcode = document.querySelector('#personal-postalcode');
        const country = document.querySelector('#personal-country');
        const email = document.querySelector('#personal-email');
        const mobile = document.querySelector('#personal-mobile');

        firstname.value = address.firstName;
        lastname.value = address.lastName;
        street.value = address.address;
        city.value = address.city;
        stateprovince.value = address.stateProvince;
        postalcode.value = address.postalCode;
        country.value = address.coutry;
        email.value = address.mail;
        mobile.value = address.mobile;
    }    
}