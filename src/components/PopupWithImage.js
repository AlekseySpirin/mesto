import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, popUpImgSelector, popUpTitleImgSelector) {
    super(popupSelector);
    this._popUpImg = document.querySelector(popUpImgSelector);
    this._popUpTitleImg = document.querySelector(popUpTitleImgSelector);
  }

  open(name, link) {
    this._popUpTitleImg.textContent = name;
    this._popUpImg.src = link;
    this._popUpImg.alt = name;

    super.open();
  }
}

export default PopupWithImage;
