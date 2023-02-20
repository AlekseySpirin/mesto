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

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.classList.remove(formConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formConfig.inactiveButtonClass);
    disableSubmitButton(buttonElement);
  } else {
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function (evt) {
      evt.preventDefault();
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formConfig) => {
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(formConfig);
