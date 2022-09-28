class RecipeItem extends HTMLElement {
  set content(content) {
    this._content = content;
    this.render();
  }

  set event(event) {
    this._event = event;
    this.render();
  }

  render() {
    this.id = this._content.idMeal;
    this.classList.add('col');
    this.innerHTML = `
            <div class="card bg-light border-0 shadow" title="${this._content.strMeal}">
                <img src="${this._content.strMealThumb}" class="card-img-top" alt="${this._content.strMeal}">
                <div class="card-body">
                    <h5 class="card-title text-truncate text-center">${this._content.strMeal}</h5>
                </div>
            </div>
        `;
    this.querySelector('.card').addEventListener('click', this._event);
  }
}

customElements.define('recipe-item', RecipeItem);
