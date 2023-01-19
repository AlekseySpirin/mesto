// pop-up // profile

let profile = document.querySelector(".profile");
let profileEditPopUpOpen = profile.querySelector(".profile__edit-button");
let popUpClose = document.querySelector(".pop-up__close");
let profilePopUp = document.querySelector(".pop-up_place_profile");
let profileName = document.querySelector(".profile__name");
let profileInfo = document.querySelector(".profile__info");

// название классов поменял (привязав попап к секции профиль), так как
// на сайте еще будут всплывающие окна и они будут записаны на другие переменные
// пытаюсь понять как будет удобнее
// 1) задавать имя переменным чтобы разграничить попапы
// 2) задавать пути через секции в которых находится попап
// переменная "pop-up ...(название секции)" ;"...__open"; "...___close"
// разберусь когда будет больше попапов

// З.Ы заметка для себя ревью не нужно отвечать на эти мысли и не расценивать
// как обращение в свой адрес

profileEditPopUpOpen.addEventListener("click", function () {
  profilePopUp.classList.add("pop-up_active");
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
});

function closeEditProfile() {
  profilePopUp.classList.remove("pop-up_active");
}

popUpClose.addEventListener("click", closeEditProfile);

// submit

let formElement = document.querySelector(".form");
let nameInput = formElement.querySelector(".form__item_el_name");
let jobInput = formElement.querySelector(".form__item_el_job");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closeEditProfile();
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
