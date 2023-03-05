export default class Card {
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
  _handleOpenPopup() {
    document.querySelector('.pop-up__title-img').textContent = this._name;
    document.querySelector('.pop-up__img').src = this._link;
    document.querySelector('.pop-up__img').alt = this._name;
    document.querySelector('.pop-up_place_img').classList.add('pop-up_active');
  }
  _handleClosePopup() {
    document.querySelector('.pop-up__img').src = '';
    document.querySelector('.pop-up_place_img').classList.remove('pop-up_active');
  }

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
      this._handleOpenPopup();
    });
    document.querySelector('.pop-up__close_place_place').addEventListener('click', () => {
      this._handleClosePopup();
    });
  }
}
