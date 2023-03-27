import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, popUpImgSelector, popUpTitleImgSelector) {
    super(popupSelector);
    this._popUpImg = this._popup.querySelector(popUpImgSelector);
    this._popUpTitleImg = this._popup.querySelector(popUpTitleImgSelector);
  }

  open(name, link) {
    this._popUpTitleImg.textContent = name;
    this._popUpImg.src = link;
    this._popUpImg.alt = name;

    super.open();
  }
}

export default PopupWithImage;
