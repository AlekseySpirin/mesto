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
  btnEditAvatar,
  profileInputName,
  profileInputInfo,
  btnEditProfile,
  popUpImgSelector,
  popUpTitleImgSelector,
  popupAvatarSelector,
  formAvatarSelector,
} from '../utils/constants.js';

// FUNCTION===============================================================================================

fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
  headers: {
    authorization: '6e9922b1-82bb-44b1-8c4a-e1a93da7bd0f',
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

fetch('https://nomoreparties.co/v1/cohort-63/users/me ', {
  headers: {
    authorization: '6e9922b1-82bb-44b1-8c4a-e1a93da7bd0f',
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

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

// AVATAR

const handleAvatarFormSubmit = (formData) => {
  const avatarContainer = document.getElementById('avatar');
  avatarContainer.style.backgroundImage = `url(${formData.link})`;

  formUpdateAvatar.close();
  formValidators['update-avatar'].resetValidation();
};

const formUpdateAvatar = new PopupWithForm(
  popupAvatarSelector,
  formAvatarSelector,
  inputSelector,
  handleAvatarFormSubmit,
);
formUpdateAvatar.setEventListeners();

// LISTENERS //==============================================================================
btnEditAvatar.addEventListener('click', () => {
  formUpdateAvatar.open();
});

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
