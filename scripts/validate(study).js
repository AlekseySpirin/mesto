const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'form__item_invalid',
  errorClass: 'form__item-error',
};
const enableValidation = (formConfig) => {
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
  const formInputList = Array.from(document.querySelectorAll(formConfig.inputSelector));

  const buttonSubmitForm = Array.from(document.querySelector(formConfig.submitButtonSelector));

  formInputList.forEach((elementInput) => {
    const errorTextContainerSelector = document.querySelector(`.form__item-error_el_${elementInput.name}`);
    const elementError = document.querySelector(errorTextContainerSelector);

    elementInput.addEventListener('input', (e) => {
      const input = e.target;
      checkFormValidity(formInputList, buttonSubmitForm);
      checkInputValidity(input, elementError, 'form__item-input_invalid');
    });

    // а зачем вот эта штука?
    // elementInput.addEventListener('focus', focusHandler);
  });

  // formList.forEach((elementForm) => {
  //   elementForm.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //   });
  //   setEventListeners(elementForm);
  // });
};

// ФУНКЦИИ

const submitCommonHandler = (e) => {
  e.preventDefault();
  const formIsValid = checkFormValidity(formInputList, buttonSubmitForm);
  if (!formIsValid) {
    // нет смысла делать другие действия, т.к.
    // форма не валидна, останавливаем цепочку вызовов
    e.stopImmediatePropagation();
  }
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('pop-up__button_disabled');
  } else {
    buttonElement.classList.remove('pop-up__button_disabled');
  }
};

// const checkFormValidity = (elementsFields, elementSubmit) => {
//   toggleButtonState(elementSubmit, { disable: true });

//   const formIsValid = elementsFields.every(({ validity }) => validity.valid);

//   if (!formIsValid) {
//     toggleButtonState(elementSubmit, { disable: false });
//   }

//   return formIsValid;
// };

const setFieldError = (elementField, elementError, { validationMessage, valid, invalidFieldClass }) => {
  elementError.textContent = validationMessage;
  if (valid) {
    elementField.classList.remove(invalidFieldClass);
  } else {
    elementField.classList.add(invalidFieldClass);
  }
};

const checkFieldValidity = (elementField, elementError, invalidFieldClass) => {
  // const validationMessage = elementField.validationMessage;
  // const valid = elementField.validity.valid;
  const {
    validationMessage,
    validity: { valid },
  } = elementField;

  const params = {
    validationMessage,
    valid,
    invalidFieldClass,
  };

  setFieldError(elementField, elementError, params);
  return valid;
};

// КРАСАТЕНЮШКА

// formInputList.forEach((elementInput) => {
//   const errorTextContainerSelector = `.form__item-error_el_${elementInput.name}`;
//   const elementError = document.querySelector(errorTextContainerSelector);

//   elementInput.addEventListener('input', (e) => {
//     const input = e.target;
//     checkFormValidity(formInputList, buttonSubmitForm);
//     checkInputValidity(input, elementError, 'form__item-input_invalid');
//   });

//   // а зачем вот эта штука?
//   elementInput.addEventListener('focus', focusHandler);
// });

// const submitCommonHandler = (e) => {
//   e.preventDefault();
//   const formIsValid = checkFormValidity(formInputList, buttonSubmitForm);
//   if (!formIsValid) {
//     // нет смысла делать другие действия, т.к.
//     // форма не валидна, останавливаем цепочку вызовов
//     e.stopImmediatePropagation();
//   }
// };
