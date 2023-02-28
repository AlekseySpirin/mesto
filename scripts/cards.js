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

// POP-UP // IMG //

const popUpPlaceImg = document.querySelector('.pop-up_place_img');
const popUpImg = document.querySelector('.pop-up__img');
const popUpTitleImg = document.querySelector('.pop-up__title-img');
const bntClosePlaceImg = document.querySelector('.pop-up__close_place_place');

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;

    return this._element;
  }
  // _handleOpenPopup() {
  //   popUpImg.src = this._link;
  //   popUpPlaceImg.classList.add('pop-up_active');
  // }
  // _handleClosePopup() {
  //   popUpImg = '';
  //   popUpPlaceImg.classList.remove('popup_is-opened');
  // }

  _setEventListener() {
    this._element.querySelector('.card__trash').addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._element.remove();
    });
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.stopPropagation();
      evt.target.classList.toggle('card__like_active');
    });
    this._element.addEventListener('click', () => {
      openPopUp(popUpPlaceImg);
      popUpTitleImg.textContent = this._name;
      popUpImg.src = this._link;
      popUpImg.alt = this._name;
    });
    bntClosePlaceImg.addEventListener('click', () => closePopUp(popUpPlaceImg));
  }
}

const renderCards = (items) => {
  items.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.generateCard();
    document.querySelector('.cards').append(cardElement);
  });
};

renderCards(initialCards);
