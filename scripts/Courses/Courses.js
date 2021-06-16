"use strict";

//Courses.js is run when the Courses.html page is shown for the first time. This class fetches data from the REST.API and displays it on the page.
class Courses {

    constructor() {
        this.getData();
    }

    getData() {
        // fetch("http://localhost:3000/kurser")
        //     .then((response) => response.json())
        //     .then((c) => this.createTable(c));
        fetch("https://localhost:5001/api/course/")
            .then((response) => response.json())
            .then((c) => this.createTable(c));
    }

    createTable(coursesAvailable) {
        allCourses = coursesAvailable;
        var _this = this;
        //1. Get id with email.
        let email = localStorage.getItem("WestcoastEducation_RegisteredEmail");
        let url = `https://localhost:5001/api/student/find/${email}`;
        fetch(url).then(function (response) {
            response.json().then(function (student) {
                //2. Get courses already bought with id from 1..
                fetch(`https://localhost:5001/api/courseStudent/${student.id}`).then(function (response2) {
                    response2.json().then(function (coursesUser) {
                        let bought = false;
                        for (let courseAvailable of coursesAvailable) {
                            bought = false;
                            for (const courseUser of coursesUser) {
                                if (courseUser.courseId === courseAvailable.id) {
                                    bought = true;
                                    break;
                                }
                            }
                            //3. List only courses not bought.
                            if (bought === false) {
                                _this.addRow(courseAvailable);
                                _this.addEventListeners();
                                bought = false;
                            }
                        }
                    });
                });
            });
        });
    }

    addRow(course) {
        const tableCoursesContent = document.querySelector("#table-courses-content");

        tableCoursesContent.insertAdjacentHTML(
            "beforeend",
            `
                <tr id="courses-row${course.id}">
                    <td>${course.id}</td>
                    <td>${course.titel}</td>
                    <td>${course.description}</td>
                    <td>${course.length}</td>
                    <td>${course.difficulty}</td>
                    <td>${course.price}</td>
                    <td class="cart-btn-table add" title="Klicka för att lägga i kundvagnen."><i class="fas fa-cart-arrow-down fa-lg"></i> </td>
                </tr>
            `
        );
    }

    addEventListeners() {
        const addToCartButtons = document.querySelectorAll(".table-courses-container .add");
        var lastCartButton = addToCartButtons[addToCartButtons.length - 1];
        const courseId = lastCartButton.parentNode.firstElementChild.firstChild.nodeValue;
        lastCartButton.addEventListener("click", function addEL() {
            lastCartButton.removeEventListener("click", addEL);
            lastCartButton.textContent = '';
            lastCartButton.insertAdjacentHTML("beforeend", `<i class="fas fa-check fa-lg"></i>`);
            shoppingCartBar.updateCounter(true);
            shoppingCart.addCourse(courseId);
            shoppingCart.addEventListenerToDelete();
        });
    }

    reAddShoppingCartIcon(shoppingCartIcon) {
        shoppingCartIcon.textContent = '';
        shoppingCartIcon.insertAdjacentHTML(
            "beforeend",
            `<i class="fas fa-cart-arrow-down fa-lg"></i>`
        );
    }

    reAddShoppingCartIconEventListener(courseId, shoppingCartIcon) {
        shoppingCartIcon.addEventListener("click", function addEL() {
            shoppingCartIcon.removeEventListener("click", addEL);
            shoppingCartIcon.textContent = '';
            shoppingCartIcon.insertAdjacentHTML("beforeend", `<i class="fas fa-check fa-lg"></i>`);
            shoppingCartBar.updateCounter(true);
            shoppingCart.addCourse(courseId);
            shoppingCart.addEventListenerToDelete();
        });
    }

    DeleteRowFromHTML(id) {
        let searcString = `#table-courses-content #courses-row${id}`;
        const selectedRow = document.querySelector(searcString);
        if (selectedRow !== null) selectedRow.remove();
    }
}

