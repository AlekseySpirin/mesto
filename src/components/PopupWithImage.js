import Popup from './Popup.js';
import { popUpImg, popUpTitleImg } from '../utils/constants.js';
class PopupWithImage extends Popup {
  constructor(popupSelector, popUpImgSelector, popUpTitleImgSelector) {
    super(popupSelector);
    this._popUpImg = document.querySelector(popUpImgSelector);
    this._popUpTitleImgSelector = document.querySelector(popUpTitleImgSelector);
  }

  open(name, link) {
    popUpTitleImg.textContent = name;
    popUpImg.src = link;
    popUpImg.alt = name;

    super.open();
  }
}

export default PopupWithImage;
