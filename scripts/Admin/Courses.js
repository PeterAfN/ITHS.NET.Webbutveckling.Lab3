"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    let courses = new Courses();
});


const modalOverlayEditCourse = document.querySelector(".modal-overlay-edit");

// document.addEventListener("click", (e) => {
//   CloseCorrectOverlay(e);
// });

// function CloseCorrectOverlay (event) {
//   if (event.target === modalOverlayEditCourse) {
//     this.toggle();
//   }
// }

class Courses {

    constructor() {
        this.modalOverlayEditCourse = document.querySelector(".modal-overlay-edit");
        this.idInput = document.querySelector('#id');
        this.titleInput = document.querySelector('#title');
        this.descriptionInput = document.querySelector('#description');
        this.lengthInput = document.querySelector('#length');
        this.difficultyInput = document.querySelector('#difficulty');
        this.priceInput = document.querySelector('#price');
        this.statusInput = document.querySelector('#active');

        this.statusInput.checked = true;
        this.idInput.value = "fdsfsdf";
        this.addEventListeners();
        this.addCoursesToTable();
    }

    addEventListeners() {
        let _this = this;
        let courseSearchButton = document.querySelector(".search-course-btn");
        let saveButton = document.querySelector("#save");
        let cancelButton = document.querySelector("#cancel");
        let closeButtonAdd = document.querySelector("#close-button-edit");

        courseSearchButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleSearchClick();
        });
        document.addEventListener("click", (e) => {
            if (e.target === modalOverlayEditCourse) {
                _this.toggle();
            }
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

    handleSearchClick() {
        let inputCourseNumber = document.querySelector("main input[placeholder]");
        let number = inputCourseNumber.value;
        if (number === "" || number === "*") {
            this.clearTable();
            this.addCoursesToTable();
        }
        else this.addCourseToTable(number);
    }

    addCourseToTable(mail) {
        this.getCourseFromAPI(mail).then(course => {
            this.clearTable();
            if (course !== undefined) {
                this.addRow(Object.values(course)[0]);
                this.addEventListenerToEdit();
            }
        });
    }

    clearTable() {
        let allTableItems = document.querySelector("#table-courses-content");
        allTableItems.innerHTML = '';
    }

    async getCourseFromAPI(courseNumber) {
        let url = `https://localhost:5001/api/course/${courseNumber}`;
        return fetch(url)
            .then(course => {
                if (course.ok) {
                    return course.json().then(course => ({ course }));
                }
                console.log("error reading course from database");
            });
    }

    addCoursesToTable() {
        this.getCoursesFromAPI().then(allcourses => {
            let courses = Object.values(allcourses)[0];
            for (let course of courses) {
                this.addRow(course);
                this.addEventListenerToEdit();
            }
        });
    }

    async getCoursesFromAPI() {
        let url = "https://localhost:5001/api/course";
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
                    <td>${course.status}</td>
                    <td id="${course.id}" class="cart-btn-table edit" title="Klicka för att ändra i kurs."><i class="far fa-edit"></i></td>
                </tr>
            `
        );
    }

    addEventListenerToEdit() {
        let _this = this;
        const editCourseButtons = document.querySelectorAll("#table-courses-container .edit");
        var lastCourseButton = editCourseButtons[editCourseButtons.length - 1];
        this.selectedCourseId = lastCourseButton.parentNode.firstElementChild.firstChild.nodeValue;
        const selectedCourseId = lastCourseButton.parentNode.firstElementChild.firstChild.nodeValue;

        lastCourseButton.addEventListener("click", function addEL(event) {
            _this.toggle();
            //call a new function that add values to the modal form with selectedCourseId
        });
    }

    toggle() {
        // const modal = document.querySelector(".modal-edit-course");
        // modal.classList.toggle("closed-edit-course");
        // this.modalOverlayEditCourse.classList.toggle("closed-edit-course");

        const modalAdd = document.querySelector(".modal-edit");
        modalAdd.classList.toggle("closed-edit");
        // this.modalOverlayEditCourse.classList.toggle("close-overlay-edit");
        modalOverlayEditCourse.classList.toggle("close-overlay-edit");
    }

}