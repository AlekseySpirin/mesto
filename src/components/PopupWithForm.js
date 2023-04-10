import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, inputSelector, callbackSubmitForm) {
    super(popupSelector);

    this._formElement = this._popup.querySelector(formSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._input = inputSelector;
    this._inputList = this._formElement.querySelectorAll(this._input);
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._callbackSubmitForm(this._getInputValues());

      this.close();
    });
  }
  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
