//Buy.js is opened from the ShoppingCart.js and is the final buy confirmation dialog after the buy was succesfull.
class Buy {

    constructor() {
        this.addEventListenerToButtons();
    }

    addEventListenerToButtons() {
        let searcString = ".modal-buy .ok-buy-confirmation";
        const okbutton = document.querySelector(searcString);
        const closeButtonBuy = document.querySelector("#close-button-buy");

        okbutton.addEventListener("click", () => {
            setTimeout(() => {  }, 2000);
            // shoppingCartBar.counterReset();
            // courses.clearAll();
            // courses.getData();

            this.close();
        });

        closeButtonBuy.addEventListener("click", () => {
            setTimeout(() => {  }, 2000);
            // shoppingCartBar.counterReset();
            // courses.clearAll();
            // courses.getData();

            this.toggle();
        });
    }

    close() {
        this.toggle();
    }

    toggle() {
        const modalBuy = document.querySelector(".modal-buy");
        modalBuy.classList.toggle("closed-buy");
        modalOverlayBuy.classList.toggle("close-overlay-buy");
    }
}