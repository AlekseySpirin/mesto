// const formConfig = {
//   formSelector: '.form',
//   inputSelector: '.form__item',
//   submitButtonSelector: '.pop-up__button',
//   inactiveButtonClass: 'pop-up__button_disabled',
//   inputErrorClass: 'form__item_invalid',
//   errorClass: 'form__item-error',
// };

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
  inputElement.classList.add('form__item_invalid');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__item-error');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.form__item-error_el_${inputElement.name}`);
  inputElement.classList.remove('form__item_invalid');
  errorElement.classList.remove('form__item-error');
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
    buttonElement.classList.add('pop-up__button_disabled');
  } else {
    buttonElement.classList.remove('pop-up__button_disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.pop-up__button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  //   const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
  //   const inputList = Array.from(document.querySelectorAll(formConfig.inputSelector));
  //   const buttonSubmitForm = document.querySelector(formConfig.submitButtonSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();
