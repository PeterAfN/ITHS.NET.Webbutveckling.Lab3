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
        let _this = this;
        let mail = localStorage.getItem("WestcoastEducation_RegisteredEmail");
        _this.getStudent(mail).then(student => {
            let id = Object.values(student)[0].id;
            _this.getCourses(id).then(coursesUser => {
                let courses = Object.values(coursesUser)[0];
                let bought = false;
                for (let courseAvailable of coursesAvailable) {
                    bought = false;
                    for (const courseUser of courses) {
                        if (courseUser.courseId === courseAvailable.id) {
                            bought = true;
                            break;
                        }
                    }
                    if (bought === false) {
                        //List only courses not bought.
                        _this.addRow(courseAvailable);
                        _this.addEventListeners();
                        bought = false;
                    }
                }
            });
        });
    }

    async getStudent(mail) {
        let url = `https://localhost:5001/api/student/find/${mail}`;
        return fetch(url)
            .then(student => {
                if (student.ok) {
                    return student.json().then(student => ({ student }));
                }
                console.log("error reading student from database");
            });
    }

    async getCourses(studentId) {
        let url = `https://localhost:5001/api/courseStudent/${studentId}`;
        return fetch(url)
            .then(courses => {
                if (courses.ok) {
                    return courses.json().then(courses => ({ courses }));
                }
                console.log("error reading courses from database");
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

