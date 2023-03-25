class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closedPopUpEsc = this._closedPopUpEsc.bind(this);
  }

  open() {
    this._popup.classList.add('pop-up_active');
    document.addEventListener('keydown', this._closedPopUpEsc);
  }
  close() {
    this._popup.classList.remove('pop-up_active');
    document.removeEventListener('keydown', this._closedPopUpEsc);
  }

  _closedPopUpEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('pop-up_active')) {
        this.close();
      }
      if (evt.target.classList.contains('pop-up__close')) {
        this.close();
      }
    });
  }
}

export default Popup;
