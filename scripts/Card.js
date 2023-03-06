export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._cardImg = '.card__img';
    this._cardTitle = '.card__title';
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = this._cardTemplate.cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(this._cardTitle).textContent = this._name;
    this._element.querySelector(this._cardImg).src = this._link;
    this._element.querySelector(this._cardImg).alt = this._name;
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._element.remove();
    });
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
    });
    this._element.querySelector(this._cardImg).addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
