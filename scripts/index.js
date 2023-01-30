// CLOSE-BTN

const popUpClose = document.querySelectorAll(".pop-up__close");

popUpClose.forEach(function (el) {
  el.addEventListener("click", closePopUp);
});

function closePopUp() {
  const popUpActive = document.querySelector(".pop-up_active");
  popUpActive.classList.remove("pop-up_active");
}

// ARRAY // PLACE-------------------------------------------------------------
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".card");
// создали переменную для копирования HTML структуры шаблона

const cards = document.querySelector(".cards");
// создали переменную для добавления элементов массива в список HTML

renderTemplate(initialCards);
// вызвали функцию с массивом в качестве аргумента

function renderTemplate(items) {
  // функция для перебора и добавления массива в список
  const elements = items.map((item) => {
    return createElement(item);
    //объявили переменную и с помощью "map" создали новый массив
    // перебрали элементы задав им свойства из значений элементов массива initialCards
  });
  cards.append(...elements);
  // заполнили список HTML элементами из скопированного массива
}

function createElement(item) {
  const element = cardTemplate.cloneNode(true);
  // объявили переменную в котурую скопировали копию структуры
  // заготовленной карточки <template> в HTML

  element.querySelector(".card__title").textContent = item.name;
  // каждому элементу в шаблоне <template> призваиваем значение
  // имени из массива initialCards

  const imgPlace = element.querySelector(".card__img");

  imgPlace.src = item.link;
  // каждому элементу в шаблоне <template> призваиваем значение
  // ссылки из массива initialCards

  element.querySelector(".card__img").alt = item.name;
  // каждому элементу в шаблоне <template> призваиваем значение
  // alt (если картинка не загрузится на странице - отобразится имя элемента)
  // из массива initialCards

  element.querySelector(".card__trash").addEventListener("click", () => {
    element.remove();
  });

  const like = element.querySelector(".card__like");
  like.addEventListener("click", () => {
    like.classList.toggle("card__like_active");
  });

  imgPlace.addEventListener("click", () => {});

  return element;
  // возвращаем элемент из скопированного массива к которому применили
  // значения из массива initialCards
}

// POP-UP // PLACE ---------------------------------------------------

const popUpPlace = document.querySelector(".pop-up_place_add-place");
const placeForm = popUpPlace.querySelector(".form");
const placeName = popUpPlace.querySelector(".form__item_el_name");
const placeLink = popUpPlace.querySelector(".form__item_el_link");

// ADD-BUTTON // PLACE

const addPlaceBtn = document.querySelector(".profile__add-button");
// создали переменную для кнопки "Добавить"

addPlaceBtn.addEventListener("click", () => {
  popUpPlace.classList.add("pop-up_active");

  placeName.placeholder = "Название";
  placeLink.placeholder = "Ссылка на картинку";
});

//SUBMIT // PLACE

const submitBtnPlace = popUpPlace.querySelector(".pop-up__button-save");

placeForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = placeForm.querySelector(".form__item_el_name").value;
  const link = placeForm.querySelector(".form__item_el_link").value;
  const element = createElement({ name: name, link: link, alt: name });
  closePopUp(popUpPlace);
  cards.prepend(element);
});

// POP-UP // PROFILE //--------------------------------------
const popUp = document.querySelector(".pop-up");
const popUpProfile = document.querySelector(".pop-up_place_profile");

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileInfo = profile.querySelector(".profile__info");

// EDIT-BTN // PROFILE

const profileEditPopUpOpen = profile.querySelector(".profile__edit-button");

profileEditPopUpOpen.addEventListener("click", function () {
  popUp.classList.add("pop-up_active");
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
});

// SUBMIT // PROFILE

const formElement = document.querySelector(".form_place_edit-profile");
const nameInput = formElement.querySelector(".form__item_el_name");
const jobInput = formElement.querySelector(".form__item_el_job");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopUp();
}

formElement.addEventListener("submit", handleFormSubmit);

// LIKE

// const like = document.querySelectorAll(".card__like");

// like.forEach(function (el) {
//   el.addEventListener("click", function (evt) {
//     evt.stopPropagation();
//     el.classList.toggle("card__like_active");
//   });
// });
