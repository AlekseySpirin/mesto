import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
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
  initialCards,
  avatarId,
  avatarContainer,
  // initialCards,
} from '../utils/constants.js';

// FUNCTION===============================================================================================

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: { authorization: '6e9922b1-82bb-44b1-8c4a-e1a93da7bd0f', 'Content-Type': 'application/json' },
});

api
  .getInitialCards()
  .then((cards) => {
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

console.log(api);

// fetch('https://mesto.nomoreparties.co/v1/cohort-63/cards', {
//   headers: {
//     authorization: '6e9922b1-82bb-44b1-8c4a-e1a93da7bd0f',
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// fetch('https://nomoreparties.co/v1/cohort-63/users/me ', {
//   headers: {
//     authorization: '6e9922b1-82bb-44b1-8c4a-e1a93da7bd0f',
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// PROFILE - func

const handleProfileFormSubmit = (userData) => {
  formValidators['edit-profile'].disableSubmitButton();
  api
    .editServerProfile(userData)
    .then((user) => {
      console.log(user);
      console.log(userProfileInfo);
      userProfileInfo.setUserInfo({ name: user.name, info: user.about, avatar: user.avatar });
      console.log(userProfileInfo);

      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
  // userProfileInfo.setUserInfo(userData);

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
  // const cardElement = createCard({ name: formData.place, link: formData.link });
  // cardList.addItem(cardElement);

  api
    .addCardServer(formData)
    .then((card) => {
      console.log(card);
      cardList.addItem(createCard(card));
    })
    .catch((err) => {
      console.log(err);
    });

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
console.log(cardList);
// cardList.renderItems();

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

// USER-INFO

const userProfileInfo = new UserInfo(profileNameSelector, profileInfoSelector, avatarId);
// avatarId;

api
  .getServerUserInfo()
  .then((info) => {
    console.log(info);
    // userProfileInfo.getUserInfo(info);
    userProfileInfo.setUserInfo({
      info: info.about,
      avatar: info.avatar,
      cohort: info.cohort,
      name: info.name,
      id: info.id,
    });

    // console.log(userProfileInfo.setUserInfo(info));
  })
  .catch((err) => {
    console.log(err);
  });
console.log(userProfileInfo);
// AVATAR

const handleAvatarFormSubmit = (formData) => {
  // const avatarContainer = document.getElementById('avatar');
  // avatarContainer.style.backgroundImage = `url(${formData.link})`;
  api
    .editAvatar(formData)
    .then((avatar) => {
      console.log(avatar);
      console.log(avatar.avatar);
      // const avatarContainer = document.getElementById('avatar');
      avatarContainer.style.backgroundImage = `url(${avatar.avatar}})`;
      console.dir(avatarContainer.style.backgroundImage);
    })
    .catch((err) => {
      console.log(err);
    });
  console.dir(avatarContainer);
  formUpdateAvatar.close();
  formValidators['update-avatar'].resetValidation();
};
console.dir(avatarContainer);
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
