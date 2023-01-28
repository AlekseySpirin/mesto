// Array
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
    //объявили переменную и с помощью "map" создали новый массив
    // перебрали элементы задав им свойства из значений элементов массива initialCards
    const element = cardTemplate.cloneNode(true);
    // объявили переменную в котурую скопировали копию структуры
    // заготовленной карточки <template> в HTML

    element.querySelector(".card__title").textContent = item.name;
    // каждому элементу в шаблоне <template> призваиваем значение
    // имени из массива initialCards

    element.querySelector(".card__img").src = item.link;
    // каждому элементу в шаблоне <template> призваиваем значение
    // ссылки из массива initialCards

    element.querySelector(".card__img").alt = item.name;
    // каждому элементу в шаблоне <template> призваиваем значение
    // alt (если картинка не загрузится на странице - отобразится имя элемента)
    // из массива initialCards

    return element;
    // возвращаем элемент из скопированного массива к которому применили
    // значения из массива initialCards
  });
  cards.prepend(...elements);
  // заполнили список HTML элементами из скопированного массива
  // добавление в начало
}

// POP-UP_ADD_PLACE

// ADD-BUTTON //

const cardAddBtn = document.querySelector(".profile__add-button");
// создали переменную для кнопки "Добавить"

cardAddBtn.addEventListener("click", () => {});

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

// let like = document.querySelectorAll(".card__like");

// like.forEach(function (el) {
//   el.addEventListener("click", function (evt) {
//     evt.stopPropagation();
//     this.classList.toggle("card__like_active");
//   });
// });
