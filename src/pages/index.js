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

    userProfileInfo.setUserInfo({
      info: info.about,
      name: info.name,
      id: info._id,
    });
    userProfileInfo.setUserAvatar({ avatar: info.avatar });
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

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
    {
      handleRemoveButtonClick: (card) => {
        deleteCardPopup.open();
        deleteCardPopup.setSubmitAction(() => {
          api
            .deleteCardServer(card._cardId)
            .then(() => {
              card.deleteCard();
              deleteCardPopup.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
    },
    {
      handleClickLikes: () => {
        if (data.likes.some((user) => user._id === userId)) {
          api
            .deleteLikeServer(data.cardId)
            .then((res) => {
              card.deleteLike();
              data.likes = res.likes;
              card.countLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .addLikeServer(data.cardId)
            .then((res) => {
              card.addLike();
              data.likes = res.likes;
              card.countLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
  );

  return card.generateCard();
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
        userId: userId,
      });

      cardList.addItem(cardElement);
    },
  },
  cardsContainer,
);

// POPUP-FORM-PLACE

const handlePlaceFormSubmit = (formData) => {
  formValidators['add-place'].disableSubmitButton();
  formPlace.loadingButtonText('Создание...');

  api
    .addCardServer(formData)
    .then((card) => {
      cardList.addItem(
        createCard({
          name: card.name,
          link: card.link,
          likes: card.likes,
          cardId: card._id,
          ownerId: card.owner._id,
          userId: userId,
        }),
      );

      formPlace.close();
    })
    .catch((err) => {
      formValidators['add-place'].enableSubmitButton();
      console.log(err);
    })
    .finally(() => formPlace.loadingButtonText('Создать'));
};

const formPlace = new PopupWithForm(popupPlaceSelector, placeFormSelector, inputSelector, handlePlaceFormSubmit);
formPlace.setEventListeners();

// POPUP-FORM-PROFILE

const handleProfileFormSubmit = (userData) => {
  formValidators['edit-profile'].disableSubmitButton();
  formProfile.loadingButtonText('Сохранение...');
  api
    .editServerProfile(userData)
    .then((user) => {
      userProfileInfo.setUserInfo({ name: user.name, info: user.about });
      formProfile.close();
    })
    .catch((err) => {
      formValidators['edit-profile'].enableSubmitButton();
      console.log(err);
    })
    .finally(() => formProfile.loadingButtonText('Сохранить'));
};

const formProfile = new PopupWithForm(
  popUpProfileSelector,
  formSelectorProfile,
  inputSelector,
  handleProfileFormSubmit,
);

formProfile.setEventListeners();

// USER-INFO

const userProfileInfo = new UserInfo(profileNameSelector, profileInfoSelector, avatarId);

// AVATAR

const handleAvatarFormSubmit = (formData) => {
  formValidators['update-avatar'].disableSubmitButton();
  formUpdateAvatar.loadingButtonText('Сохранение...');
  api
    .editAvatar(formData)
    .then((avatar) => {
      userProfileInfo.setUserAvatar({ avatar: avatar.avatar });
      console.log('avatar');
      formUpdateAvatar.close();
    })
    .catch((err) => {
      formValidators['update-avatar'].enableSubmitButton();
      console.log(err);
    })
    .finally(() => formUpdateAvatar.loadingButtonText('Сохранить'));
};

const formUpdateAvatar = new PopupWithForm(
  popupAvatarSelector,
  formAvatarSelector,
  inputSelector,
  handleAvatarFormSubmit,
);
formUpdateAvatar.setEventListeners();

// IMG
const popupImage = new PopupWithImage('.pop-up_place_img', popUpImgSelector, popUpTitleImgSelector);
popupImage.setEventListeners();

// LISTENERS //==============================================================================
btnEditAvatar.addEventListener('click', () => {
  formValidators['update-avatar'].resetValidation();
  formUpdateAvatar.open();
});

btnEditProfile.addEventListener('click', () => {
  const user = userProfileInfo.getUserInfo();
  profileInputName.value = user.name;
  profileInputInfo.value = user.info;

  formProfile.open();
});

btnPlaceAdd.addEventListener('click', () => {
  formValidators['add-place'].resetValidation();
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
