import Popup from './Popup.js';
import { popUpImg, popUpTitleImg } from '../utils/constants.js';
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popup = document.querySelector(popupSelector);
  }

  open(name, link) {
    popUpTitleImg.textContent = name;
    popUpImg.src = link;
    popUpImg.alt = name;

    super.open();
  }
}

export default PopupWithImage;
