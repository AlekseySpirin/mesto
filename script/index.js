// pop-up

let popUpOpen = document.querySelector(".pop-up__open");
let popUpClose = document.querySelector(".pop-up__close");
let popUp = document.querySelector(".pop-up");

popUpOpen.addEventListener("click", function () {
  popUp.classList.add("pop-up_active");
});

popUpClose.addEventListener("click", function () {
  popUp.classList.remove("pop-up_active");
});

// submit

let formElement = document.querySelector(".pop-up");

let nameInput = formElement.querySelector("");

// like

let like = document.querySelectorAll(".card__like");

like.forEach(function (el) {
  el.addEventListener("click", function (ev) {
    ev.stopPropagation();
    this.classList.toggle("card__like_active");
  });
});
