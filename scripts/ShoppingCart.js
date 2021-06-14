"use strict";
//ShoppingCart.js is opened from the ShoppingCartBar.js navigation bar.
class ShoppingCart {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.addEventListeners();
    }

    addEventListeners() {
        const closeButton = document.querySelector("#close-button");
        const openPaymentButton = document.querySelector(".to-payment");
        openPaymentButton.addEventListener("click", () => {
            this.saveCoursesToDatabase();
            this.toggle();
            buy.toggle();
        });
        closeButton.addEventListener("click", () => {
            shoppingCart.toggle();
        });
    }

    saveCoursesToDatabase() {
        var _this = this;
        let email = localStorage.getItem("WestcoastEducation_RegisteredEmail");
        let url = `https://localhost:5001/api/student/find/${email}`;
        fetch(url).then(function (response) {
            response.json().then(function (student) {

                // for ( let shoppingCartItem of shoppingCartItems)
                //shoppingCartItems.forEach(shoppingCartItem =>
                let _shoppingCartItems = shoppingCartItems;

                for (let i = 0; i < _shoppingCartItems.length; i++) {
                    if (student.id !== null) {
                        let studentCourse = {
                            courseId: Number(_shoppingCartItems[i].id),
                            studentId: Number(student.id),
                        };
                        url = `https://localhost:5001/api/courseStudent/`;

                        let response = fetch(url, {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(studentCourse),
                        }).then(function (text) {
                            console.log('Request successful', text);
                            console.log(i);
                            console.log(_shoppingCartItems);
                            // _this.DeleteRowFromHTML(_shoppingCartItems[i].id + 1);
                            // _this.DeleteRowFromArray(_shoppingCartItems[i].id + 1);
                        }).catch(function (error) {
                            console.log('Request failed', error);
                        });;
                    }

                };
                _this.deleteAllRowsFromHTML();
            });
        });
    }

    addEventListenerToDelete() {
        const item = document.querySelectorAll(".modal-shopping-cart .delete");
        const lastItem = item[item.length - 1];
        const id =
            lastItem.parentNode.parentNode.firstElementChild.firstChild.nodeValue;
        lastItem.addEventListener("click", () => {
            this.DeleteRowFromHTML(id);
            // this.DeleteRowFromArray(id);

            let xpath = `//td[text()='${id}']`;
            let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            let shoppingCartIcon = matchingElement.parentNode.lastElementChild;

            courses.reAddShoppingCartIcon(shoppingCartIcon);
            courses.reAddShoppingCartIconEventListener(id, shoppingCartIcon);
        });
    }

    deleteAllRowsFromHTML() {
        let searcString = `#shopping-cart-content`;
        const selectedTable = document.querySelector(searcString);
        while (selectedTable.hasChildNodes()) {
            selectedTable.removeChild(selectedTable.firstChild);
        }      
    }

    DeleteRowFromHTML(id) {
        let searcString = `.modal-shopping-cart #row${id}`;
        const selectedRow = document.querySelector(searcString);
        if (selectedRow !== null) selectedRow.remove();
        // this.DeleteRowFromArray(id);
    }

    DeleteRowFromArray(id) {
        let item = shoppingCartItems.findIndex((item) => item.id == id);
        while (item != -1) {
            shoppingCart.updateTotalPrice(false, id - 1);
            shoppingCartItems.splice(item, 1);
            item = shoppingCartItems.findIndex((item) => item.id == id);
            shoppingCartBar.updateCounter(false);
        }
    }

    addCourse(courseId) {
        const tableShoppingCart = document.querySelector("#shopping-cart-content");
        const index = data.findIndex((course) => course.id == courseId);
        let existAlready = shoppingCartItems.findIndex(
            (course) => course.id == courseId
        );

        if (existAlready !== -1) {
            //let searcString = `.modal-shopping-cart #row${index + 1}`;
            //let amount = document.querySelector(searcString);
            //let nr = amount.lastElementChild.previousElementSibling.textContent;
            //amount.lastElementChild.previousElementSibling.textContent = Number(nr) + 1;
        } else {
            tableShoppingCart.insertAdjacentHTML(
                "beforeend",
                `
                    <tr id="row${index + 1}">
                        <td>${data[index].id}</td>
                        <td>${data[index].titel}</td>
                        <td>${data[index].price}</td>
                        <td><i class="far fa-trash-alt delete"></i></td>
                    </tr>
                `
            );
        }

        shoppingCartItems.push(data[index]);
        shoppingCart.updateTotalPrice(true, index);
    }

    updateTotalPrice(add, courseId) {
        let searcString = ".modal-shopping-cart .price-total";
        const element = document.querySelector(searcString);
        let priceTotalCurrent = element.textContent;

        let indexNewItem = shoppingCartItems.findIndex(
            (item) => item.id === courseId + 1
        );
        let priceNewItem = shoppingCartItems[indexNewItem].price;

        if (add === true) {
            element.textContent = Number(priceTotalCurrent) + Number(priceNewItem);
        } else {
            element.textContent = Number(priceTotalCurrent) - Number(priceNewItem);
        }
    }

    toggle() {
        const modal = document.querySelector(".modal-shopping-cart");
        modal.classList.toggle("closed-shopping-cart");
        modalOverlayShoppingCart.classList.toggle("closed-shopping-cart");
    }
}