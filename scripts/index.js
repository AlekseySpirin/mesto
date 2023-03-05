import FormValidator from './FormValidator.js';
import Card from './Card.js';
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'form__item_invalid',
  errorClass: 'form__item-error',
};
// // BTN-CLOSE //
// const popUpCloseList = document.querySelectorAll('.pop-up__close');

// CARDS //
// const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');

const cardsContainer = document.querySelector('.cards');

// const popUp = document.querySelector('.pop-up');
const popUpList = document.querySelectorAll('.pop-up');

// POP-UP // PLACE //

const popUpPlace = document.querySelector('.pop-up_place_add-place');

const btnPlaceAdd = document.querySelector('.profile__add-button');
const bntCloseAddPlace = document.querySelector('.pop-up__close_place_add-place');

// const formList = document.querySelectorAll('.form');
// const btnSubmitForm = document.querySelector('.pop-up__button');
const btnSubmitFormEditProfile = document.querySelector('.pop-up__button_place_edit-profile');

// FORM // PLACE //
const placeForm = popUpPlace.querySelector('.form_place_add-place');
const placeInputName = placeForm.querySelector('.form__item_el_name');
const placeInputLink = placeForm.querySelector('.form__item_el_link');
const btnSubmitFormPlace = placeForm.querySelector('.pop-up__button_place_place');
const formPlaceFields = Array.from(placeForm.querySelectorAll('.form__item'));
// FORM // PROFILE //
const profileForm = document.querySelector('.form_place_edit-profile');
const profileInputName = profileForm.querySelector('.form__item_el_name');
const profileInputJob = profileForm.querySelector('.form__item_el_job');

// FORMs // ARRAY
const formsArr = Array.from(document.querySelectorAll('.form'));

// POP-UP // IMG //

// const popUpPlaceImg = document.querySelector('.pop-up_place_img');
// const popUpImg = document.querySelector('.pop-up__img');
// const popUpTitleImg = document.querySelector('.pop-up__title-img');
// const bntClosePlaceImg = document.querySelector('.pop-up__close_place_place');

// POP-UP // PROFILE //

const popUpProfile = document.querySelector('.pop-up_place_profile');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__info');
const bntCloseEditProfile = document.querySelector('.pop-up__close_place_profile');

// BTN-EDIT // PROFILE

const btnEditProfile = profile.querySelector('.profile__edit-button');

// FUNCTION===============================================================================================

// profile - func

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = profileInputName.value;
  profileInfo.textContent = profileInputJob.value;
  closePopUp(popUpProfile);
};

// place -func

const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  disableSubmitButton(btnSubmitFormPlace);

  const formIsValid = formPlaceFields.every((item) => item.validity.valid);
  if (formIsValid) {
    const cardInsert = new Card({
      name: placeInputName.value,
      link: placeInputLink.value,
    });

    const cardElement = cardInsert.generateCard();

    closePopUp(popUpPlace);
    cardsContainer.prepend(cardElement);
  }
};

// button - func

const disableSubmitButton = (buttonElement) => {
  buttonElement.setAttribute('disabled', 'disabled');
};

const closedPopUpEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popUpAcitive = document.querySelector('.pop-up_active');
    closePopUp(popUpAcitive);
  }
};

//popup - func
const openPopUp = (popup) => {
  popup.classList.add('pop-up_active');

  document.addEventListener('keydown', closedPopUpEsc);
};

const closePopUp = (popup) => {
  popup.classList.remove('pop-up_active');

  document.removeEventListener('keydown', closedPopUpEsc);
};

// cards - func
const renderCards = (items) => {
  items.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();
    document.querySelector('.cards').append(cardElement);
  });
};

renderCards(initialCards);

// validate - func

const bustingForm = (items) => {
  items.forEach((formElement) => {
    const form = new FormValidator(formConfig, formElement);
    form.enableValidation();
  });
};

bustingForm(formsArr);

// LISTENERS //==============================================================================

// profile

profileForm.addEventListener('submit', handleProfileFormSubmit);

btnEditProfile.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileInfo.textContent;
  disableSubmitButton(btnSubmitFormEditProfile);

  openPopUp(popUpProfile);
});

bntCloseEditProfile.addEventListener('click', () => {
  closePopUp(popUpProfile);

  disableSubmitButton(btnSubmitFormEditProfile);
});

// place

placeForm.addEventListener('submit', handlePlaceFormSubmit);

btnPlaceAdd.addEventListener('click', () => {
  placeForm.reset();
  disableSubmitButton(btnSubmitFormEditProfile);

  openPopUp(popUpPlace);
});

bntCloseAddPlace.addEventListener('click', () => {
  closePopUp(popUpPlace);
  disableSubmitButton(btnSubmitFormPlace);
});

// forms

popUpList.forEach((popUpElement) => {
  popUpElement.addEventListener('mousedown', (evt) => {
    if (evt.target === popUpElement) {
      closePopUp(popUpElement);
    }
  });
});
