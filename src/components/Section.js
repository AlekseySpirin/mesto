class Section {
  constructor({ data, renderer }, cardsContainer) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  addItem(element) {
    this._container.append(element);
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
