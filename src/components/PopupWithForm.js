import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, inputSelector, callbackSubmitForm) {
    super(popupSelector);

    this._formElement = this._popup.querySelector(formSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._input = inputSelector;
    this._inputList = this._formElement.querySelectorAll(this._input);
    this._btnFormSubmit = this._formElement.querySelector('.pop-up__button');
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  loadingButtonText(text) {
    this._btnFormSubmit.textContent = text;
  }
  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._callbackSubmitForm(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
