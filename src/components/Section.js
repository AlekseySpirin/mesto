class Section {
  constructor({ data, renderer }, cardsContainer) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
