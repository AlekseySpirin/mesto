// BTN-CLOSE //
const popUpCloseList = document.querySelectorAll('.pop-up__close');

// CARDS //
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
// создали переменную для копирования HTML структуры шаблона

const cardsContainer = document.querySelector('.cards');
// создали переменную для добавления элементов массива в список HTML
const popUp = document.querySelector('.pop-up');
const popUpList = document.querySelectorAll('.pop-up');

// POP-UP // PLACE //

const popUpPlace = document.querySelector('.pop-up_place_add-place');

const btnPlaceAdd = document.querySelector('.profile__add-button');
const bntCloseAddPlace = document.querySelector('.pop-up__close_place_add-place');
// создали переменную для кнопки "Добавить"
const formList = document.querySelectorAll('.form');
const btnSubmitForm = document.querySelector('.pop-up__button');
const btnSubmitFormEditProfile = document.querySelector('.pop-up__button_place_edit-profile');
// FORM // PLACE //
const placeForm = popUpPlace.querySelector('.form_place_add-place');
const placeInputName = placeForm.querySelector('.form__item_el_name');
const placeInputLink = placeForm.querySelector('.form__item_el_link');
const btnSubmitFormPlace = placeForm.querySelector('.pop-up__button_place_place');
const formPlaceFields = Array.from(placeForm.querySelectorAll('.form__item'));
// FORM // PROFILE //
const profileForm = document.querySelector('.form_place_edit-profile');
const profileInputName = profileForm.querySelector('.form__item_el_name');
const profileInputJob = profileForm.querySelector('.form__item_el_job');

// FORM-INPUTS // ARRAY

// POP-UP // IMG //

const popUpPlaceImg = document.querySelector('.pop-up_place_img');
const popUpImg = document.querySelector('.pop-up__img');
const popUpTitleImg = document.querySelector('.pop-up__title-img');
const bntClosePlaceImg = document.querySelector('.pop-up__close_place_place');
// POP-UP // PROFILE //

const popUpProfile = document.querySelector('.pop-up_place_profile');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileInfo = profile.querySelector('.profile__info');
const bntCloseEditProfile = document.querySelector('.pop-up__close_place_profile');

// BTN-EDIT // PROFILE

const btnEditProfile = profile.querySelector('.profile__edit-button');

// ARRAY // PLACE-------------------------------------------------------------

renderCards(initialCards);
// вызвали функцию с массивом в качестве аргумента

function renderCards(items) {
  // функция для перебора и добавления массива в список
  const cards = items.map((cardData) => {
    return createCard(cardData);
    //объявили переменную и с помощью "map" создали новый массив
    // перебрали элементы задав им свойства из значений элементов массива initialCards
  });
  cardsContainer.append(...cards);
  // заполнили список HTML элементами из скопированного массива
}

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  // объявили переменную в котурую скопировали копию структуры
  // заготовленной карточки <template> в HTML

  card.querySelector('.card__title').textContent = cardData.name;
  // каждому элементу в шаблоне <template> призваиваем значение
  // имени из массива initialCards

  const cardImg = card.querySelector('.card__img');

  cardImg.src = cardData.link;
  // каждому элементу в шаблоне <template> призваиваем значение
  // ссылки из массива initialCards

  cardImg.alt = cardData.name;
  // каждому элементу в шаблоне <template> призваиваем значение
  // alt (если картинка не загрузится на странице - отобразится имя элемента)
  // из массива initialCards

  card.querySelector('.card__trash').addEventListener('click', () => {
    card.remove();
  });

  const btnLike = card.querySelector('.card__like');
  btnLike.addEventListener('click', () => {
    btnLike.classList.toggle('card__like_active');
  });

  cardImg.addEventListener('click', () => {
    openPopUp(popUpPlaceImg);
    popUpImg.src = cardData.link;
    popUpTitleImg.textContent = cardData.name;
    popUpImg.alt = cardData.name;
  });
  bntClosePlaceImg.addEventListener('click', () => {
    closePopUp(popUpPlaceImg);
  });

  return card;
  // возвращаем элемент из скопированного массива к которому применили
  // значения из массива initialCards
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileInputName.value;
  profileInfo.textContent = profileInputJob.value;
  closePopUp(popUpProfile);
}

const handlePlaceFormSubmit = (evt) => {
  evt.preventDefault();
  disableSubmitButton(btnSubmitFormPlace);

  const formIsValid = formPlaceFields.every((item) => item.validity.valid);
  if (formIsValid) {
    const cardInsert = createCard({
      name: placeInputName.value,
      link: placeInputLink.value,
    });
    closePopUp(popUpPlace);
    cardsContainer.prepend(cardInsert);
  }
};

const closedPopUpEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popUpAcitive = document.querySelector('.pop-up_active');
    closePopUp(popUpAcitive);
  }
};

const openPopUp = (popup) => {
  popup.classList.add('pop-up_active');

  document.addEventListener('keydown', closedPopUpEsc);
};

const closePopUp = (popup) => {
  popup.classList.remove('pop-up_active');

  document.removeEventListener('keydown', closedPopUpEsc);
};

//SUBMIT //

placeForm.addEventListener('submit', handlePlaceFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);

btnEditProfile.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputJob.value = profileInfo.textContent;
  disableSubmitButton(btnSubmitFormPlace);
  openPopUp(popUpProfile);
});

btnPlaceAdd.addEventListener('click', () => {
  placeForm.reset();
  disableSubmitButton(btnSubmitFormEditProfile);
  openPopUp(popUpPlace);
});

bntCloseEditProfile.addEventListener('click', () => {
  closePopUp(popUpProfile);
  disableSubmitButton(btnSubmitFormEditProfile);
});

bntCloseAddPlace.addEventListener('click', () => {
  closePopUp(popUpPlace);
  disableSubmitButton(btnSubmitFormPlace);
});

popUpList.forEach((popUpElement) => {
  popUpElement.addEventListener('mousedown', (evt) => {
    if (evt.target === popUpElement) {
      closePopUp(popUpElement);
    }
  });
});

console.log(placeInputName.validity.valid);

enableValidation(formConfig);
