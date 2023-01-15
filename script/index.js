// pop-up

let popUpOpen = document.querySelector(".profile__edit-button");
let popUpClose = document.querySelector(".pop-up__close");
let popUp = document.querySelector(".pop-up");

popUpOpen.addEventListener("click", function () {
  popUp.classList.add("pop-up_active");
});

popUpClose.addEventListener("click", function () {
  popUp.classList.remove("pop-up_active");
});

// submit

let formElement = document.querySelector(".pop-up__body");
let nameInput = formElement.querySelector(".pop-up__name");
let jobInput = formElement.querySelector(".pop-up__job");
let buttonSave = document.querySelector(".pop-up__button-save");

nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь океана";

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (evt.submitter.classList.contains("pop-up__button-save")) {
    let profileName = document.querySelector(".profile__name");
    let profileInfo = document.querySelector(".profile__info");
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    popUp.classList.remove("pop-up_active");
  }
}

formElement.addEventListener("submit", handleFormSubmit);

//------------------------------------------------------------

// like

let like = document.querySelectorAll(".card__like");

like.forEach(function (el) {
  el.addEventListener("click", function (evt) {
    evt.stopPropagation();
    this.classList.toggle("card__like_active");
  });
});
