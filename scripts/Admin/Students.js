"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    let students = new Students();
});

class Students {

    constructor() {
        this.addEventListeners();
        this.addStudentsToTable();
    }

    addEventListeners() {
        let searchInput = document.querySelector(".search-student-input");
        let emailSearchButton = document.querySelector(".search-student-btn");

        emailSearchButton.addEventListener("click", (e) => {
            e.preventDefault();
            getStudent(searchInput.value);
        });
    }

    addStudentsToTable() {
        this.getStudentsFromAPI().then(allStudents => {
            let students = Object.values(allStudents)[0];
            for (let student of students) {
                this.addRow(student);
            }
        });
    }

    async getStudentsFromAPI() {
        let url = "https://localhost:5001/api/student";
        return fetch(url)
            .then(students => {
                if (students.ok) {
                    return students.json().then(students => ({ students }));
                }
                console.log("error reading students from database");
            });
    }

    addRow(student) {
        const tableStudentsContent = document.querySelector("#table-students-content");

        tableStudentsContent.insertAdjacentHTML(
            "beforeend",
            `
                <tr id="students-row${student.id}">
                    <td>${student.firstName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.address}</td>
                    <td>${student.city}</td>
                    <td>${student.stateProvince}</td>
                    <td>${student.postalCode}</td>
                    <td>${student.country}</td>
                    <td>${student.mail}</td>
                    <td>${student.mobile}</td>
                </tr>
            `
        );
    }

    getStudent(mail) {
        getStudentAPI(mail);
    }
}