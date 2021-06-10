"use strict";

//#region - courses.html

let data = [];              //all courses on front page
let shoppingCartItems = []; //all courses in shopping cart

let buy = new Buy();
let add = new Add("http://localhost:3000/kurser/");
let courses = new Courses();
let shoppingCart = new ShoppingCart();
let shoppingCartBar = new ShoppingCartBar(0);
let register = new Register("https://localhost:5001/api/student/");

const modalOverlayShoppingCart = document.querySelector(".modal-overlay-shopping-cart");
const modalOverlayBuy = document.querySelector(".modal-overlay-buy");
const modalOverlayAdd = document.querySelector(".modal-overlay-add");
const modalOverlayRegister = document.querySelector(".modal-overlay-register");

document.addEventListener("click", (e) => {
  CloseCorrectOverlay(e);
});

function CloseCorrectOverlay (event) {
  if (event.target === modalOverlayShoppingCart) {
    shoppingCart.toggle();
  } else if (event.target === modalOverlayBuy) {
    buy.toggle();
  } else if (event.target === modalOverlayAdd) {
    add.toggle();
  } else if (event.target === modalOverlayRegister) {
    register.toggle();
  }
}

//#endregion - courses.html