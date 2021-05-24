//Courses.js is run when the Courses.html page is shown for the first time. This class fetches data from the REST.API and displays it on the page.
class Courses {

    constructor() {
        this.getData();
    }

    getData() {
        fetch("http://localhost:3000/kurser")
            .then((response) => response.json())
            .then((data) => this.createTable(data));
    }

    createTable(courses) {
        data = courses;
        for (let course of data) {
            this.addRow(course);
        }
        this.addEventListeners();
    }

    addRow(course) {
        const tableCoursesContent = document.querySelector("#table-courses-content");

        tableCoursesContent.insertAdjacentHTML(
            "beforeend",
            `
                <tr>
                <td>${course.id}</td>
                <td>${course.title}</td>
                <td>${course.description}</td>
                <td>${course.category}</td>
                <td>${course.length}</td>
                <td>${course.type}</td>
                <td>${course.price}</td>
                <td class="cart-btn-table add">Lägg i kundvagn</td>
                </tr>
            `
        );
    }

    addEventListeners() {
        const tableRows = document.querySelectorAll(".table-courses-container .add");

        tableRows.forEach((item) => {
            const courseId = item.parentNode.firstElementChild.firstChild.nodeValue;
            item.addEventListener("click", () => {
                shoppingCartBar.updateCounter(true);
                shoppingCart.addCourse(courseId);
                shoppingCart.addEventListenerToDelete();
            });
        });
    }
}