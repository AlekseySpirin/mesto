import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  formConfig,
  popUpProfileSelector,
  popupPlaceSelector,
  placeFormSelector,
  formSelectorProfile,
  inputSelector,
  cardTemplate,
  cardsContainer,
  profileNameSelector,
  profileInfoSelector,
  btnPlaceAdd,
  placeInputName,
  placeInputLink,
  profileInputName,
  profileInputJob,
  btnEditProfile,
  popUpImg,
  popUpTitleImg,
} from '../utils/constants.js';

// FUNCTION===============================================================================================

// PROFILE - func

const handleProfileFormSubmit = () => {
  formValidators['edit-profile'].disableSubmitButton();

  userProfileInfo.setUserInfo({ name: profileInputName.value, info: profileInputJob.value });

  formProfile.close();
};

// PLACE -func

const handlePlaceFormSubmit = () => {
  const cardInsert = new Card(
    {
      name: placeInputName.value,
      link: placeInputLink.value,
    },
    cardTemplate,
    {
      handleCardClick: (name, link) => {
        popUpTitleImg.textContent = name;
        popUpImg.src = link;
        popUpImg.alt = name;

        popupImage.open(name, link);
      },
    },
  );
  const cardElement = cardInsert.generateCard();
  cardsContainer.prepend(cardElement);
  formPlace.close();
  formValidators['add-place'].resetValidation();
};

// CARD -func

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplate, {
        handleCardClick: (name, link) => {
          popUpTitleImg.textContent = name;
          popUpImg.src = link;
          popUpImg.alt = name;

          popupImage.open(name, link);
        },
      });

      const cardElement = card.generateCard();

      cardList.setItem(cardElement);
    },
  },
  cardsContainer,
);

cardList.renderItems();

// IMG
const popupImage = new PopupWithImage('.pop-up_place_img');
popupImage.setEventListeners();

// POPUP-FORM-PLACE

const formPlace = new PopupWithForm(popupPlaceSelector, placeFormSelector, inputSelector, handlePlaceFormSubmit);
formPlace.setEventListeners();

// POPUP-FORM-PROFILE

const formProfile = new PopupWithForm(
  popUpProfileSelector,
  formSelectorProfile,
  inputSelector,
  handleProfileFormSubmit,
);
formProfile.setEventListeners();

const userProfileInfo = new UserInfo(profileNameSelector, profileInfoSelector);

// LISTENERS //==============================================================================

btnEditProfile.addEventListener('click', () => {
  const user = userProfileInfo.getUserInfo();
  profileInputName.value = user.name;
  profileInputJob.value = user.info;

  formProfile.open();
});

btnPlaceAdd.addEventListener('click', () => {
  formPlace.open();
});

//VALIDATOR ==================================================================================

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
