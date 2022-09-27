import 'Src/js/components/category-item';

class CategoryList extends HTMLElement {
  set contents(contents) {
    this._contents = contents;
    this.render();
  }

  render() {
    this.classList.add('row', 'row-cols-2', 'row-cols-md-3', 'row-cols-lg-4', 'g-3', 'mt-2');
    this._contents.forEach((content) => {
      const item = document.createElement('category-item');
      item.content = content;
      this.appendChild(item);
    });
  }
}

customElements.define('category-list', CategoryList);
