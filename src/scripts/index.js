import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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
  avatarId,
  avatarContainer,
  // initialCards,
} from '../utils/constants.js';

// API
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: { authorization: '6e9922b1-82bb-44b1-8c4a-e1a93da7bd0f', 'Content-Type': 'application/json' },
});

let userId = null;

Promise.all([api.getServerUserInfo(), api.getInitialCards()])
  .then(([info, cards]) => {
    userId = info._id;
    console.log(userId);
    console.log(info);

    userProfileInfo.setUserInfo({
      info: info.about,
      name: info.name,
      id: info._id,
    });
    userProfileInfo.setUserAvatar({ avatar: info.avatar });
    cardList.renderItems(cards.reverse());
    console.log(userProfileInfo);
  })
  .catch((err) => {
    console.log(err);
  });
console.log(userId);

// CARDS

const createCard = (data) => {
  const card = new Card(
    data,
    userId,
    cardTemplate,
    {
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
    },
    () => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        api.deleteCardServer(data._id).then(() => {
          card.deleteCard();
        });
      });
    },
  );
  return card.generateCard();
};

// отображение карточек
// api
//   .getInitialCards()
//   .then((cards) => {
//     console.log(cards);
//     cardList.renderItems(cards.reverse());
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Добавление одной карточки
const handlePlaceFormSubmit = (formData) => {
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

const deleteCardPopup = new PopupWithConfirm('.pop-up_place_delete-card');
deleteCardPopup.setEventListeners();

// SECTION CARDS

const cardList = new Section(
  {
    renderer: (itemData) => {
      const cardElement = createCard({
        name: itemData.name,
        link: itemData.link,
        likes: itemData.likes,
        cardId: itemData._id,
        ownerId: itemData.owner._id,
      });

      cardList.addItem(cardElement);
    },
  },
  cardsContainer,
);

// PROFILE - func

const handleProfileFormSubmit = (userData) => {
  formValidators['edit-profile'].disableSubmitButton();
  api
    .editServerProfile(userData)
    .then((user) => {
      userProfileInfo.setUserInfo({ name: user.name, info: user.about });
    })
    .catch((err) => {
      console.log(err);
    });
  // userProfileInfo.setUserInfo(userData);

  formProfile.close();
};

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

// api
//   .getServerUserInfo()
//   .then((info) => {
//     userId = info._id;
//     console.log(userId);
//     console.log(info);

//     userProfileInfo.setUserInfo({
//       info: info.about,
//       name: info.name,
//       id: info._id,
//     });
//     userProfileInfo.setUserAvatar({ avatar: info.avatar });
//     console.log(userProfileInfo);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// console.dir(userProfileInfo);

// AVATAR

const handleAvatarFormSubmit = (formData) => {
  console.log(formData);
  api
    .editAvatar(formData)
    .then((avatar) => {
      console.log(avatar);
      userProfileInfo.setUserAvatar({ avatar: avatar.avatar });

      // avatarContainer.style.backgroundImage = `url(${avatar.avatar}})`;
    })
    .catch((err) => {
      console.log(err);
    });

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
