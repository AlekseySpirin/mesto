class Section {
  constructor({ renderer }, cardsContainer) {
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(cards) {
    this.clear();

    cards.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
