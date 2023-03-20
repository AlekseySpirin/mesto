export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = this._cardTemplate.cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.card__img');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardTrash = this._element.querySelector('.card__trash');
    this._cardLike = this._element.querySelector('.card__like');
    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._setEventListener();
    return this._element;
  }

  // _handleOpenPopup() {
  //   popupImage.src = this._image;
  //   popupElement.classList.add('popup_is-opened');
  // }

  // _handleClosePopup() {
  //   popupImage.src = '';
  //   popupElement.classList.remove('popup_is-opened');
  // }
  _setEventListener() {
    this._cardTrash.addEventListener('click', () => {
      this._element.remove();
    });
    this._cardLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
    });
    
    this._cardImg.addEventListener('click', () => {
      console.log(this._cardImg)
      this._handleCardClick(this._name, this._link);
    });
  }
}
