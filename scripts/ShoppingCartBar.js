//From this navigation bar ShoppingCartBar.js the ShoppingCart.js or Add.js are opened. 
class ShoppingCartBar {

  constructor(counter) {
    this.counter = counter;
    this.addEventListeners();
  }

  addEventListeners() {
    const openButton = document.querySelector("#open-button");
    openButton.addEventListener("click", function () {
      shoppingCart.toggle();
    });
  }

  updateCounter(add) {
    const shoppingCartItemsCtr = document.querySelector(".items-cart-ctr");
    if (add === true) this.counter += 1;
    else this.counter -= 1;
    shoppingCartItemsCtr.innerHTML = "";
    shoppingCartItemsCtr.insertAdjacentHTML(
      "beforeend",
      `
        ${this.counter}
      `
    );
  }
}