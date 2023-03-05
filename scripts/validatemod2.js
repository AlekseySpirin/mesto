const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'form__item_invalid',
  errorClass: 'form__item-error',
};

const disableSubmitButton = (buttonElement) => {
  buttonElement.setAttribute('disabled', 'disabled');
};

class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formElement = document.querySelector(formElement);
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      _showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      _hideInputError(formElement, inputElement);
    }
  };
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButton);
      disableSubmitButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._inactiveButton);
      buttonElement.removeAttribute('disabled');
    }
  };

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function (evt) {
        evt.preventDefault();
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      _setEventListeners(formElement);
    });
  };
}

const formList = Array.from(document.querySelectorAll('.form'));

const validation = (items) => {
  items.forEach((formElement) => {
    const card = new FormValidator(formConfig, formElement);
    return card;
  });
};

// enableValidation(formConfig);
