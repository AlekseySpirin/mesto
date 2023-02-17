const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'form__item_invalid',
  errorClass: 'form__item-error',
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

//=========================================================================================
// const setFieldError = (inputElement, errorElement, { validationMessage, valid, inputErrorClass }) => {
//   errorElement.textContent = validationMessage;
//   if (valid) {
//     inputElement.classList.remove(inputErrorClass);
//   }
//   if (inputElement.classList.container === inputErrorClass) {
//     inputElement.classList.remove(inputErrorClass);
//   } else {
//     inputElement.classList.add(inputErrorClass);
//   }
// };

// const checkFieldValidity = (inputElement, errorElement, inputErrorClass) => {
//   // const validationMessage = inputElement.validationMessage;
//   // const valid = inputElement.validity.valid;
//   const {
//     validationMessage,
//     validity: { valid },
//   } = inputElement;

//   const params = {
//     validationMessage,
//     valid,
//     inputErrorClass,
//   };

//   setFieldError(inputElement, errorElement, params);
//   return valid;
// };

//========================================================================================

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
  } else {
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function (evt) {
      // const field = evt.target;
      // const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
      checkInputValidity(formElement, inputElement);
      // checkFieldValidity(field, errorElement, 'form__item_invalid');
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
