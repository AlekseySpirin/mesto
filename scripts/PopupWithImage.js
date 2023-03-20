import Popup from "./Popup.js"
 class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this.popup = document.querySelector(popupSelector)
    }
    openPopUp(name, link) {
        this.popup.querySelector('.pop-up__title-img').textContent = name;
        this.popup.querySelector('.pop-up__img').src = link;
        this.popup.querySelector('.pop-up__img').alt = name;

        super.openPopUp()
    }
}

export default PopupWithImage