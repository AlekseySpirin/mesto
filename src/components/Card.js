class Card {
  constructor(data, userId, cardTemplate, { handleCardClick }, popupDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._cardId = data.cardId;
    this._ownreId = data.ownerId;
    this._popupDeleteCard = popupDeleteCard;
    this._userId = userId;
  }

  _getTemplate() {
    const cardTemplate = this._cardTemplate.cloneNode(true);
    return cardTemplate;
  }

  _visibleTrash() {
    if (this._userId !== this._ownerId) {
      this._cardTrash.style.display = 'none';
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.card__img');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardTrash = this._element.querySelector('.card__trash');
    this._cardLike = this._element.querySelector('.card__like');
    this._likesCounter = this._element.querySelector('.card__like_el_count');
    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._visibleTrash();
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._cardTrash.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });
    this._cardLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
      this._likesCounter.textContent = this._likes.length;
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
