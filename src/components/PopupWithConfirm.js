import Popup from './Popup.js';

class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form_place_delete-card');
    this._btnDelete = this._popup.querySelector('.pop-up__button_place_delete-card');
    this._handleSubmitCallback = handleSubmitCallback;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
      this.close();
    });
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }
}

export default PopupWithConfirm;
