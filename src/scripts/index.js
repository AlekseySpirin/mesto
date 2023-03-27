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
  profileInputInfo,
  btnEditProfile,
  popUpImgSelector,
  popUpTitleImgSelector,
} from '../utils/constants.js';

// FUNCTION===============================================================================================

// PROFILE - func

const handleProfileFormSubmit = (userData) => {
  formValidators['edit-profile'].disableSubmitButton();

  userProfileInfo.setUserInfo(userData);

  formProfile.close();
};

// PLACE -func
const createCard = ({ name, link }) => {
  const card = new Card({ name, link }, cardTemplate, {
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
  });
  return card.generateCard();
};

const handlePlaceFormSubmit = (formData) => {
  const cardElement = createCard({ name: formData.place, link: formData.link });
  cardList.addItem(cardElement);

  formPlace.close();
  formValidators['add-place'].resetValidation();
};

// CARD -func

const cardList = new Section(
  {
    data: initialCards,
    renderer: (itemData) => {
      const cardElement = createCard({ name: itemData.name, link: itemData.link });

      cardList.addItem(cardElement);
    },
  },
  cardsContainer,
);

cardList.renderItems();

// IMG
const popupImage = new PopupWithImage('.pop-up_place_img', popUpImgSelector, popUpTitleImgSelector);
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
  profileInputInfo.value = user.info;

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
