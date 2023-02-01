// BTN-CLOSE //
const popUpCloseList = document.querySelectorAll(".pop-up__close");

// CARDS //
const cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".card");
// создали переменную для копирования HTML структуры шаблона

const cardsContainer = document.querySelector(".cards");
// создали переменную для добавления элементов массива в список HTML

// POP-UP // PLACE //

const popUpPlace = document.querySelector(".pop-up_place_add-place");
const placeForm = popUpPlace.querySelector(".form");
const placeName = placeForm.querySelector(".form__item_el_name");
const placeLink = placeForm.querySelector(".form__item_el_link");
const btnPlaceAdd = document.querySelector(".profile__add-button");
// создали переменную для кнопки "Добавить"

// POP-UP // IMG //

const popUpPlaceImg = document.querySelector(".pop-up_place_img");
const popUpImg = document.querySelector(".pop-up__img");
const popUpTitleImg = document.querySelector(".pop-up__title-img");

// POP-UP // PROFILE //

const popUpProfile = document.querySelector(".pop-up_place_profile");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileInfo = profile.querySelector(".profile__info");
const profileForm = document.querySelector(".form_place_edit-profile");
const nameInput = profileForm.querySelector(".form__item_el_name");
const jobInput = profileForm.querySelector(".form__item_el_job");

// BTN-EDIT // PROFILE

const btnEditProfile = profile.querySelector(".profile__edit-button");

function closePopUp() {
  const popUpActive = document.querySelector(".pop-up_active");
  popUpActive.classList.remove("pop-up_active");
}

// ARRAY // PLACE-------------------------------------------------------------

renderCards(initialCards);
// вызвали функцию с массивом в качестве аргумента

function renderCards(items) {
  // функция для перебора и добавления массива в список
  const cards = items.map((cardData) => {
    return createCard(cardData);
    //объявили переменную и с помощью "map" создали новый массив
    // перебрали элементы задав им свойства из значений элементов массива initialCards
  });
  cardsContainer.append(...cards);
  // заполнили список HTML элементами из скопированного массива
}

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  // объявили переменную в котурую скопировали копию структуры
  // заготовленной карточки <template> в HTML

  card.querySelector(".card__title").textContent = cardData.name;
  // каждому элементу в шаблоне <template> призваиваем значение
  // имени из массива initialCards

  const cardImg = card.querySelector(".card__img");

  cardImg.src = cardData.link;
  // каждому элементу в шаблоне <template> призваиваем значение
  // ссылки из массива initialCards

  cardImg.alt = cardData.name;
  // каждому элементу в шаблоне <template> призваиваем значение
  // alt (если картинка не загрузится на странице - отобразится имя элемента)
  // из массива initialCards

  card.querySelector(".card__trash").addEventListener("click", () => {
    card.remove();
  });

  const btnLike = card.querySelector(".card__like");
  btnLike.addEventListener("click", () => {
    btnLike.classList.toggle("card__like_active");
  });

  cardImg.addEventListener("click", () => {
    openPopUp(popUpPlaceImg);
    popUpImg.src = cardData.link;
    popUpTitleImg.textContent = cardData.name;
    popUpImg.alt = cardData.name;
  });

  return card;
  // возвращаем элемент из скопированного массива к которому применили
  // значения из массива initialCards
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopUp();
}
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardInsert = createCard({
    name: placeName.value,
    link: placeLink.value,
  });
  closePopUp();
  cardsContainer.prepend(cardInsert);
  placeForm.reset();
}

function openPopUp(el) {
  el.classList.add("pop-up_active");
}
// BTN

// btnPlaceAdd.addEventListener("click", () => {
//   popUpPlace.classList.add("pop-up_active");
// });

// btnEditProfile.addEventListener("click", () => {
//   popUpProfile.classList.add("pop-up_active");
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileInfo.textContent;
// });
//SUBMIT //

placeForm.addEventListener("submit", handlePlaceFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
//-------------------------------------------------------------
popUpCloseList.forEach(function (el) {
  el.addEventListener("click", closePopUp);
});

btnEditProfile.addEventListener("click", () => {
  openPopUp(popUpProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
});

btnPlaceAdd.addEventListener("click", () => {
  openPopUp(popUpPlace);
});
