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
let nameInput = formElement.querySelector(".pop-up__name");
let jobInput = formElement.querySelector(".pop-up__job");

function handleFormSubmit(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile__name");
  let profileInfo = document.querySelector(".profile__info");
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
}

formElement.addEventListener("submit", handleFormSubmit);
//------------------------------------------------------------

// button-save

// let buttonSave = document.querySelector(".pop-up__button-save");

// buttonSave.addEventListener("click", function () {
//   popUp.classList.remove("pop-up_active");
// });

//------------------------------------------------------
// сделать чтобы информация не сохранялась при нажатии на крестик
// запретить применение функции при нажатии на close

// like

let like = document.querySelectorAll(".card__like");

like.forEach(function (el) {
  el.addEventListener("click", function (ev) {
    ev.stopPropagation();
    this.classList.toggle("card__like_active");
  });
});
