"use strict";

// window.addEventListener('DOMContentLoaded', (event) => {
window.addEventListener('load', (event) => {

    let purchased = new Purchased();
});

class Purchased {

    constructor() {
        let isUserRegistered = (localStorage.getItem("WestcoastEducation_IsUserRegistered") === "true");
        if (isUserRegistered) {
            fetch("https://localhost:5001/api/course/")
                .then((response) => response.json())
                .then((c) => this.createTable(c));
        }
    }

    createTable(courses) {
        let _this = this;
        let mail = localStorage.getItem("WestcoastEducation_RegisteredEmail");
        _this.getStudent(mail).then(student => {
            let id = Object.values(student)[0].id;
            _this.getCourses(id).then(coursesUser => {
                let purchasedCourses = Object.values(coursesUser)[0];
                for (let course of purchasedCourses) {
                    fetch(`https://localhost:5001/api/course/${course.courseId}`)
                        .then((response) => response.json())
                        .then((course) => {
                            _this.addRow(course);
                            _this.sortData();
                        });
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
        const tablePurchasedContent = document.querySelector("#table-purchased-content");

        tablePurchasedContent.insertAdjacentHTML(
            "beforeend",
            `
                <tr>
                    <td>${course.id}</td>
                    <td>${course.titel}</td>
                    <td>${course.description}</td>
                    <td>${course.length}</td>
                    <td>${course.difficulty}</td>
                    <td>${course.price}</td>
                </tr>
            `
        );
    }

    //from https://codereview.stackexchange.com/questions/37632/sorting-an-html-table-with-javascript
    sortData() {
        // Read table body node.
        var tableData = document.getElementById('purchased-table').getElementsByTagName('tbody').item(0);

        // Read table row nodes.
        var rowData = tableData.getElementsByTagName('tr'); 

        for(var i = 0; i < rowData.length - 1; i++) {
            for(var j = 0; j < rowData.length - (i + 1); j++) {

                //Swap row nodes if short condition matches
                if(parseInt(rowData.item(j).getElementsByTagName('td').item(0).innerHTML) > parseInt(rowData.item(j+1).getElementsByTagName('td').item(0).innerHTML)) {
                    tableData.insertBefore(rowData.item(j+1),rowData.item(j));
                }
            }
        }
    }

}


