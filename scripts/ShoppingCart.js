//ShoppingCart.js is opened from the ShoppingCartBar.js navigation bar.
class ShoppingCart {

    constructor() {
        this.addEventListeners();
    }

    addEventListeners() {
        const closeButton = document.querySelector("#close-button");
        const openPaymentButton = document.querySelector(".to-payment");
        openPaymentButton.addEventListener("click", () => {
            this.toggle();
            buy.toggle();
        });
        closeButton.addEventListener("click", () => {
            shoppingCart.toggle();
        });
    }

    addEventListenerToDelete() {
        const item = document.querySelectorAll(".modal-shopping-cart .delete");
        const lastItem = item[item.length - 1];
        const id =
            lastItem.parentNode.parentNode.firstElementChild.firstChild.nodeValue;
        lastItem.addEventListener("click", () => {
            this.DeleteRowFromHTML(id);
            this.DeleteRowFromArray(id);
            this.reAddShoppingIconAndEventListener(id);
        });
    }

    DeleteRowFromHTML(id) {
        let searcString = `.modal-shopping-cart #row${id}`;
        const selectedRow = document.querySelector(searcString);
        if (selectedRow !== null) selectedRow.remove();
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
                        <td>${data[index].title}</td>
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

    reAddShoppingIconAndEventListener(courseId) {
        let xpath = `//td[text()='${courseId}']`;
        let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        let shoppingCartIcon = matchingElement.parentNode.lastElementChild;
        shoppingCartIcon.insertAdjacentHTML(
            "beforeend",
            `<i class="fas fa-cart-arrow-down fa-lg"></i>`
        );

        shoppingCartIcon.addEventListener("click", function addEL() {
            shoppingCartIcon.removeEventListener("click", addEL);
            shoppingCartIcon.textContent = '';
            shoppingCartBar.updateCounter(true);
            shoppingCart.addCourse(courseId);
            shoppingCart.addEventListenerToDelete();
        });
    }
}