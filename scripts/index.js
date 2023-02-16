// BTN-CLOSE //
const popUpCloseList = document.querySelectorAll('.pop-up__close');

// CARDS //
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
// создали переменную для копирования HTML структуры шаблона

const cardsContainer = document.querySelector('.cards');
// создали переменную для добавления элементов массива в список HTML

// POP-UP // PLACE //

const popUpPlace = document.querySelector('.pop-up_place_add-place');

const btnPlaceAdd = document.querySelector('.profile__add-button');
// создали переменную для кнопки "Добавить"

// FORM // PLACE //
const placeForm = popUpPlace.querySelector('.form_place_add-place');
const placeInputName = placeForm.querySelector('.form__item_el_name');
const placeInputLink = placeForm.querySelector('.form__item_el_link');

// FORM // PROFILE //
const profileForm = document.querySelector('.form_place_edit-profile');
const profileInputName = profileForm.querySelector('.form__item_el_name');
const profileInputJob = profileForm.querySelector('.form__item_el_job');

// FORM-INPUTS // ARRAY

// POP-UP // IMG //

const popUpPlaceImg = document.querySelector('.pop-up_place_img');
const popUpImg = document.querySelector('.pop-up__img');
const popUpTitleImg = document.querySelector('.pop-up__title-img');

// POP-UP // PROFILE //

const popUpProfile = document.querySelector('.pop-up_place_profile');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__info');

// FORM-CONFIG //

// const formConfig = {
//   formSelector: '.form',
//   inputSelector: '.form__item',
//   submitButtonSelector: '.pop-up__button',
//   inactiveButtonClass: 'pop-up__button_disabled',
//   inputErrorClass: 'form__item_invalid',
//   errorClass: 'form__item-error',
// };

// BTN-EDIT // PROFILE

const btnEditProfile = profile.querySelector('.profile__edit-button');

function closePopUp() {
  const popUpActive = document.querySelector('.pop-up_active');
  popUpActive.classList.remove('pop-up_active');
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

  card.querySelector('.card__title').textContent = cardData.name;
  // каждому элементу в шаблоне <template> призваиваем значение
  // имени из массива initialCards

  const cardImg = card.querySelector('.card__img');

  cardImg.src = cardData.link;
  // каждому элементу в шаблоне <template> призваиваем значение
  // ссылки из массива initialCards

  cardImg.alt = cardData.name;
  // каждому элементу в шаблоне <template> призваиваем значение
  // alt (если картинка не загрузится на странице - отобразится имя элемента)
  // из массива initialCards

  card.querySelector('.card__trash').addEventListener('click', () => {
    card.remove();
  });

  const btnLike = card.querySelector('.card__like');
  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('card__like_active');
  });

  cardImg.addEventListener('click', () => {
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

  profileName.textContent = profileInputName.value;
  profileInfo.textContent = profileInputJob.value;
  closePopUp();
}
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardInsert = createCard({
    name: placeInputName.value,
    link: placeInputLink.value,
  });
  closePopUp();
  cardsContainer.prepend(cardInsert);
  placeForm.reset();
}

function openPopUp(el) {
  el.classList.add('pop-up_active');
}
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//TEST VALIDATION

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('form__input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('form__input-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('form__input_type_error');
//   errorElement.classList.remove('form__input-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };
// const hasInvalidInput = (inputList) => {

//   return inputList.some((inputElement) => {

//     return !inputElement.validity.valid
//   })
// }

// const toggleButtonState = (inputList, buttonElement) => {

//   if (hasInvalidInput(inputList)) {

//     buttonElement.classList.add('button_inactive');
//   } else {

//     buttonElement.classList.remove('button_inactive');
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.form__input'));
//   const buttonElement = formElement.querySelector('.form__submit');

//   // чтобы проверить состояние кнопки в самом начале
//   toggleButtonState(inputList, buttonElement);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       // чтобы проверять его при изменении любого из полей
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
// const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

// fieldsetList.forEach((fieldSet) => {
//   setEventListeners(fieldSet);
// });

//   });
// };

// enableValidation();
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------

//SUBMIT //

placeForm.addEventListener('submit', handlePlaceFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
//-------------------------------------------------------------
popUpCloseList.forEach(function (el) {
  el.addEventListener('click', closePopUp);
});

btnEditProfile.addEventListener('click', () => {
  openPopUp(popUpProfile);
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileInfo.textContent;
});

btnPlaceAdd.addEventListener('click', () => {
  openPopUp(popUpPlace);
});
