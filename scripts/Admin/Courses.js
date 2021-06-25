"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    let courses = new Courses();
});

class Courses {

    constructor() {
        this.addEventListeners();
        this.addCoursesToTable();
    }

    addEventListeners() {
        let courseSearchButton = document.querySelector(".search-course-btn");

        courseSearchButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleSearchClick();
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
        console.log(course);
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
                    <td class="cart-btn-table add" title="Klicka för att ändra i kurs."><i class="far fa-edit"></i></td>
                </tr>
            `
        );
    }

}