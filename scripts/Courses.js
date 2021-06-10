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

        addToCartButtons.forEach((shoppingCartIcon) => {
            const courseId = shoppingCartIcon.parentNode.firstElementChild.firstChild.nodeValue;
            shoppingCartIcon.addEventListener("click", function addEL() {
                shoppingCartIcon.removeEventListener("click", addEL);
                shoppingCartIcon.textContent = ''; //removes <i class="fas fa-cart-arrow-down fa-lg"></i>           
                shoppingCartIcon.insertAdjacentHTML("beforeend", `<i class="fas fa-check fa-lg"></i>`);
                shoppingCartBar.updateCounter(true);
                shoppingCart.addCourse(courseId);
                shoppingCart.addEventListenerToDelete();
            });
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
}