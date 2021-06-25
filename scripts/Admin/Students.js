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
        let emailSearchButton = document.querySelector(".search-student-btn");

        emailSearchButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleSearchClick();
        });
    }

    handleSearchClick() {
        let inputEmail = document.querySelector("main input[placeholder]");
        let mail = inputEmail.value;
        if (mail === "" || mail === "*") {
            this.clearTable();
            this.addStudentsToTable();
        }
        else this.addStudentToTable(mail);
    }

    addStudentToTable(mail) {
        this.getStudentFromAPI(mail).then(student => {
            this.clearTable();
            if (student !== undefined) {
                this.addRow(Object.values(student)[0]);
            }
        });
    }

    clearTable() {
        let allTableItems = document.querySelector("#table-students-content");
        // allTableItems.remove();
        allTableItems.innerHTML = '';
    }

    async getStudentFromAPI(mail) {
        let url = `https://localhost:5001/api/student/find/${mail}`;
        return fetch(url)
            .then(student => {
                if (student.ok) {
                    return student.json().then(student => ({ student }));
                }
                console.log("error reading student from database");
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

}