class CategoryItem extends HTMLElement {
  set content(content) {
    this._content = content;
    this.render();
  }

  set event(event) {
    this._event = event;
    this.render();
  }

  render() {
    this.id = this._content.strCategory;
    this.classList.add('col');
    this.innerHTML = `
            <div class="card bg-light border-0 shadow" title="${this._content.strCategory}">
                <img src="${this._content.strCategoryThumb}" class="card-img-top" alt="${this._content.strCategory}">
                <div class="card-body">
                    <h5 class="card-title text-center text-truncate">${this._content.strCategory}</h5>
                </div>
            </div>
        `;
    this.querySelector('.card').addEventListener('click', this._event);
  }
}

customElements.define('category-item', CategoryItem);
