import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import {
  initialCards,
  formConfig ,
  cardTemplate,
  cardsContainer,
  cardListSelector,
  popUpList,
  popUpPlace,
  btnPlaceAdd,
  placeForm,
  placeInputName,
  placeInputLink,
  profileForm,
  profileInputName,
  profileInputJob,
  popUpProfile,
  profile,
  profileName,
  profileInfo,
  btnEditProfile,
  popUpPlaceImg,
  popUpImg,
  popUpTitleImg
} from '../utils/constants.js';

// FUNCTION===============================================================================================

const cardList = new Section({data: initialCards, renderer: (item) => {
  const card = new Card(item, cardTemplate, handleCardClick)
    

  const cardElement = card.generateCard();

  cardList.setItem(cardElement);
} }, cardsContainer);


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

// const createCard = (item) => {
//   const card = new Card(item, cardTemplate, handleCardClick);
//   const cardElement = card.generateCard();
//   return cardElement;
// };

const handleCardClick = (name, link) => {
  popUpTitleImg.textContent = name;
  popUpImg.src = link;
  popUpImg.alt = name;
  openPopUp(popUpPlaceImg);
};

// const renderCards = (items) => {
//   items.forEach((item) => {
//     const cardElement = createCard(item);
//     cardsContainer.append(cardElement);
//   });
// };

// renderCards(initialCards);

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


cardList.renderItems()