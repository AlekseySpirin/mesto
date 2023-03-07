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

// CARDS //
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
const cardsContainer = document.querySelector('.cards');
const popUpList = document.querySelectorAll('.pop-up');

// POP-UP // PLACE //

const popUpPlace = document.querySelector('.pop-up_place_add-place');
const btnPlaceAdd = document.querySelector('.profile__add-button');

// FORM // PLACE //
const placeForm = popUpPlace.querySelector('.form_place_add-place');
const placeInputName = placeForm.querySelector('.form__item_el_name');
const placeInputLink = placeForm.querySelector('.form__item_el_link');

// FORM // PROFILE //
const profileForm = document.querySelector('.form_place_edit-profile');
const profileInputName = profileForm.querySelector('.form__item_el_name');
const profileInputJob = profileForm.querySelector('.form__item_el_job');

// POP-UP // PROFILE //

const popUpProfile = document.querySelector('.pop-up_place_profile');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__info');

// BTN-EDIT // PROFILE

const btnEditProfile = profile.querySelector('.profile__edit-button');

// POP-UP // IMG //

const popUpPlaceImg = document.querySelector('.pop-up_place_img');
const popUpImg = document.querySelector('.pop-up__img');
const popUpTitleImg = document.querySelector('.pop-up__title-img');

// FUNCTION===============================================================================================

// profile - func

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  formValidators['edit-profile'].disableSubmitButton();
  profileName.textContent = profileInputName.value;
  profileInfo.textContent = profileInputJob.value;
  closePopUp(popUpProfile);
};

// place -func

const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();

  const cardInsert = new Card(
    {
      name: placeInputName.value,
      link: placeInputLink.value,
    },
    cardTemplate,
    handleCardClick,
  );
  const cardElement = cardInsert.generateCard();
  cardsContainer.prepend(cardElement);
  closePopUp(popUpPlace);
  formValidators['add-place'].resetValidation();
};

// button - func

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

const createCard = (item) => {
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const handleCardClick = (name, link) => {
  popUpTitleImg.textContent = name;
  popUpImg.src = link;
  popUpImg.alt = name;
  openPopUp(popUpPlaceImg);
};

const renderCards = (items) => {
  items.forEach((item) => {
    const cardElement = createCard(item);
    cardsContainer.append(cardElement);
  });
};

renderCards(initialCards);

// validate - func

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formConfig);

// LISTENERS //==============================================================================

// profile

profileForm.addEventListener('submit', handleProfileFormSubmit);

btnEditProfile.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileInfo.textContent;
  openPopUp(popUpProfile);
});

// place

placeForm.addEventListener('submit', handlePlaceFormSubmit);

btnPlaceAdd.addEventListener('click', () => {
  openPopUp(popUpPlace);
});

// forms

popUpList.forEach((popUpElement) => {
  popUpElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('pop-up_active')) {
      closePopUp(popUpElement);
    }
    if (evt.target.classList.contains('pop-up__close')) {
      closePopUp(popUpElement);
    }
  });
});
