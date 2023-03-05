const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'form__item_invalid',
  errorClass: 'form__item-error',
};

// const disableSubmitButton = (buttonElement) => {
//   buttonElement.setAttribute('disabled', 'disabled');
// };

console.log(formConfig.formSelector);

class FormValidator {
  constructor(formConfig, formElement) {
    this._formElement = formElement;
    this._formSelector = formConfig.formSelector;
    this._inputSelector = formConfig.inputSelector;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._inactiveButtonClass = formConfig.inactiveButtonClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._errorClass = formConfig.errorClass;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
    inputElement.classList.add(formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
    inputElement.classList.remove(formConfig.inputErrorClass);
    errorElement.classList.remove(formConfig.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (_checkInvalidInput(inputList)) {
      buttonElement.classList.add(formConfig.inactiveButtonClass);
      disableSubmitButton(buttonElement);
    } else {
      buttonElement.classList.remove(formConfig.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
    const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function (evt) {
        evt.preventDefault();
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  disableSubmitButton = (buttonElement) => {
    buttonElement.setAttribute('disabled', 'disabled');
  };

  enableValidation = (formConfig) => {
    const formList = Array.from(document.querySelectorAll(formConfig.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  };
}

const profileTest = new FormValidator(formConfig, document.querySelector('.form_place_edit-profile'));
profileTest.enableValidation(formConfig);

const placeTest = new FormValidator(formConfig, document.querySelector('.form_place_add-place'));
placeTest.enableValidation(formConfig);
