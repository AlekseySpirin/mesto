import Popup from './Popup.js';

class PopupWithConfirm extends Popup {
  setEventListeners() {
    this._popup.addEventLisntener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmitCallback();
    });
    super.setEventListeners();
  }
}

export default PopupWithConfirm;
