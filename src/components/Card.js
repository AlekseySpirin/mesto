class Card {
  constructor(data, userId, cardTemplate, { handleCardClick }, { handleRemoveButtonClick }, { handleClickLikes }) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._cardId = data.cardId;
    this._ownerId = data.ownerId;
    this._userId = userId;
    this._handleRemoveButtonClick = handleRemoveButtonClick;
    this._handleClickLikes = handleClickLikes;
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
    this._likesCounter = this._element.querySelector('.card__like_el_count');

    this._likesCounter.textContent = this._likes.length;
    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._updateInfo();
    this._visibleTrash();
    this._setEventListener();

    return this._element;
  }

  addLike() {
    this._cardLike.classList.add('card__like_active');
  }

  deleteLike() {
    this._cardLike.classList.remove('card__like_active');
  }

  countLikes(likes) {
    this._likes = likes;

    const likesCounter = this._element.querySelector('.card__like_el_count');
    likesCounter.textContent = this._likes.length;
  }

  _visibleTrash() {
    if (this._userId !== this._ownerId) {
      this._cardTrash.remove();
    }
  }
  _updateInfo() {
    this._likesCounter.textContent = this._likes.length;
    if (this._likes.some((user) => user._id === this._userId)) {
      this._cardLike.classList.add('card__like_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListener() {
    this._cardTrash.addEventListener('click', () => {
      this._handleRemoveButtonClick(this);
    });
    this._cardLike.addEventListener('click', (evt) => {
      this._handleClickLikes(this._cardId);
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
