export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        

    }

    openPopUp() {
        this._popup.classList.add('pop-up_active')
        document.addEventListener('keydown', closedPopUpEsc);

    }
    closePopUp() {
        this._popup.classList.remove('pop-up_active')
        document.removeEventListener('keydown', closedPopUpEsc);
    }

    _closedPopUpEsc = (evt) => {
        if (evt.key === 'Escape') {
          const popUpAcitive = document.querySelector('.pop-up_active');
          closePopup(popUpAcitive);
        }
      };
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('pop-up_active')) {
                closePopUp(popUpElement);
                console.log('Hello')
              }
            if (evt.target.classList.contains('pop-up__close')) {
                closePopUp(popUpElement);
                console.log('Helloooooo')
              }
        })
    }
}   
